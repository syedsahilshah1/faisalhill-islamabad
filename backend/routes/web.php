<?php

use App\Http\Controllers\MediaController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Serve stored media. The api document root rewrites every request
// through the Laravel front controller, and each deploy removes the
// public disk symlink because it is untracked, so uploads would
// otherwise 404. Streaming them from the disk root keeps the URLs
// returned by the media upload endpoint reachable on every deploy.
Route::get('/storage/{path}', [MediaController::class, 'serve'])
    ->where('path', '.*');
