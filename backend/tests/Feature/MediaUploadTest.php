<?php

namespace Tests\Feature;

use App\Models\User;
use App\Support\MediaStorage;
use App\Support\PermissionRegistry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MediaUploadTest extends TestCase
{
    use RefreshDatabase;

    private function userWith(array $permissions, string $role = 'admin'): User
    {
        return User::create([
            'name' => 'Media Test Admin',
            'email' => 'media-'.implode('-', $permissions ?: ['none']).'-'.$role.'@example.com',
            'password' => Hash::make('password123'),
            'role' => $role,
            'status' => 'active',
            'permissions' => $permissions,
        ]);
    }

    private function tokenFor(User $user): string
    {
        return $user->createToken('test')->plainTextToken;
    }

    /**
     * A real 1x1 PNG, written as bytes.
     *
     * `UploadedFile::fake()->image()` generates the file with GD, which is not
     * installed in this environment. Supplying genuine PNG bytes keeps the
     * `image` and `mimetypes` rules on their real code path — the MIME type is
     * sniffed from the contents, so a stub file would fail validation and the
     * test would pass for the wrong reason.
     */
    private function pngFile(string $name = 'hero.png'): UploadedFile
    {
        $bytes = base64_decode(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
        );

        $path = tempnam(sys_get_temp_dir(), 'fh-test-');
        file_put_contents($path, $bytes);

        return new UploadedFile($path, $name, 'image/png', UPLOAD_ERR_OK, true);
    }

    public function test_the_gallery_upload_route_resolves_to_a_real_method()
    {
        // This route was registered in routes/api.php but pointed at an `upload`
        // method that did not exist, so every POST to it produced a 500 rather
        // than an upload. Asserting through the route proves the wiring, not
        // just that a method happens to exist on the class.
        $route = collect(app('router')->getRoutes()->getRoutes())
            ->first(fn ($r) => $r->uri() === 'api/gallery/upload');

        $this->assertNotNull($route, 'The gallery upload route is missing');
        $this->assertSame(
            'App\Http\Controllers\GalleryController@upload',
            $route->getAction('uses'),
            'The gallery upload route does not point at the implemented method'
        );

        $this->assertTrue(
            method_exists($route->getControllerClass(), 'upload'),
            'GalleryController::upload() is still missing'
        );
    }

    public function test_an_image_is_stored_as_a_file_and_returns_a_url()
    {
        Storage::fake('public');

        $user = $this->userWith([PermissionRegistry::GALLERY]);
        $token = $this->tokenFor($user);

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->post('/api/admin/media/upload', [
                'image' => $this->pngFile('hero.png'),
            ], ['Accept' => 'application/json']);

        $response->assertCreated();

        $url = $response->json('url');
        $this->assertNotNull($url);
        $this->assertStringStartsWith('/storage/cms/', $url);

        // The file must actually exist on disk. Returning a URL without writing
        // anything would produce a broken image on the live site.
        $path = Storage::disk('public')->path(ltrim(str_replace('/storage/', '', $url), '/'));
        $this->assertFileExists($path, 'The upload returned a URL but no file was written');
    }

    public function test_the_stored_filename_does_not_come_from_the_client()
    {
        Storage::fake('public');

        $token = $this->tokenFor($this->userWith([PermissionRegistry::HOMEPAGE_CMS]));

        // A traversal-shaped name must not survive into the stored path.
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->post('/api/admin/media/upload', [
                'image' => $this->pngFile('passwd.png'),
                'folder' => '../../../../etc',
            ], ['Accept' => 'application/json']);

        $response->assertCreated();

        $url = $response->json('url');

        $this->assertStringNotContainsString('..', $url);
        $this->assertStringStartsWith('/storage/cms/', $url);
        $this->assertStringNotContainsString('passwd', $url);
    }

    public function test_an_executable_disguised_as_an_image_is_rejected()
    {
        Storage::fake('public');

        $token = $this->tokenFor($this->userWith([PermissionRegistry::GALLERY]));

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->post('/api/admin/media/upload', [
                'image' => UploadedFile::fake()->create('payload.svg', 8, 'image/svg+xml'),
            ], ['Accept' => 'application/json'])
            ->assertStatus(422);

        // Nothing may be written when validation fails.
        $this->assertEmpty(Storage::disk('public')->allFiles());
    }

    public function test_a_non_image_upload_is_rejected()
    {
        Storage::fake('public');

        $token = $this->tokenFor($this->userWith([PermissionRegistry::GALLERY]));

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->post('/api/admin/media/upload', [
                'image' => UploadedFile::fake()->create('notes.txt', 4, 'text/plain'),
            ], ['Accept' => 'application/json'])
            ->assertStatus(422);

        $this->assertEmpty(Storage::disk('public')->allFiles());
    }

    public function test_an_oversized_upload_is_rejected_before_it_is_written()
    {
        Storage::fake('public');

        $token = $this->tokenFor($this->userWith([PermissionRegistry::GALLERY]));

        // One kilobyte over the documented ceiling.
        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->post('/api/admin/media/upload', [
                'image' => UploadedFile::fake()->create('huge.jpg', MediaStorage::MAX_KILOBYTES + 1, 'image/jpeg'),
            ], ['Accept' => 'application/json'])
            ->assertStatus(422);

        $this->assertEmpty(Storage::disk('public')->allFiles());
    }

    public function test_uploads_require_authentication()
    {
        Storage::fake('public');

        $this->post('/api/admin/media/upload', [
            'image' => $this->pngFile('anon.png'),
        ], ['Accept' => 'application/json'])->assertStatus(401);

        $this->assertEmpty(Storage::disk('public')->allFiles());
    }

    public function test_an_administrator_with_no_content_permission_cannot_upload()
    {
        Storage::fake('public');

        // Leads-only access must not confer the ability to write to disk.
        $token = $this->tokenFor($this->userWith([PermissionRegistry::LEADS]));

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->post('/api/admin/media/upload', [
                'image' => $this->pngFile('leads.png'),
            ], ['Accept' => 'application/json'])
            ->assertStatus(403);

        $this->assertEmpty(Storage::disk('public')->allFiles());
    }

    public function test_a_deactivated_administrator_cannot_upload()
    {
        Storage::fake('public');

        $user = $this->userWith([PermissionRegistry::GALLERY]);
        $token = $this->tokenFor($user);

        $user->update(['status' => 'inactive']);

        $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->post('/api/admin/media/upload', [
                'image' => $this->pngFile('gone.png'),
            ], ['Accept' => 'application/json'])
            ->assertStatus(403);

        $this->assertEmpty(Storage::disk('public')->allFiles());
    }

    public function test_the_gallery_endpoint_still_uploads()
    {
        Storage::fake('public');

        $token = $this->tokenFor($this->userWith([PermissionRegistry::GALLERY]));

        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])
            ->post('/api/gallery/upload', [
                'image' => $this->pngFile('gate.png'),
            ], ['Accept' => 'application/json']);

        $response->assertCreated();
        $this->assertStringStartsWith('/storage/cms/gallery/', $response->json('url'));
    }

    public function test_the_upload_route_is_rate_limited()
    {
        $route = collect(app('router')->getRoutes()->getRoutes())
            ->first(fn ($r) => $r->uri() === 'api/admin/media/upload');

        $this->assertNotNull($route);
        $this->assertContains('throttle:admin-write', $route->gatherMiddleware());
    }

    /**
     * The `public/storage` link must exist, or every uploaded image 404s.
     *
     * This is the one failure mode the upload tests above cannot see.
     * `Storage::fake('public')` redirects writes to a temp directory and
     * `Storage::disk('public')->path()` resolves inside the storage root, so
     * both stay green while the file the browser is handed a URL for is
     * unreachable over HTTP. That is exactly what happened: uploads reported
     * success, the URL was saved into settings, and the editor silently showed
     * its fallback image because the request for the real file 404'd.
     *
     * Deliberately does not fake the disk, and does not assert on a URL — it
     * asserts the link itself, so it fails on a fresh clone or a deploy that
     * forgot `php artisan storage:link`.
     */
    public function test_the_public_storage_link_exists_so_uploads_are_reachable()
    {
        $publicPath = public_path('storage');
        $storageRoot = Storage::disk('public')->path('');

        $this->assertTrue(
            file_exists($publicPath),
            'public/storage is missing. Run "php artisan storage:link" or every '
            .'uploaded CMS image will 404 while the upload itself reports success.'
        );

        $this->assertDirectoryExists($publicPath);

        // A real link must resolve to the public disk's root, otherwise uploads
        // land somewhere the web server never reads.
        $this->assertSame(
            realpath($storageRoot),
            realpath($publicPath),
            'public/storage points somewhere other than the public disk root'
        );
    }
}
