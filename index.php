<?php

/*
 * Shared-hosting front controller.
 *
 * The api subdomain's document root is the repository root, but Laravel's
 * entry point lives in backend/public. This file forwards every request to
 * that entry point so the API is served from the expected URL while the
 * repository layout stays unchanged.
 */

require_once __DIR__.'/backend/public/index.php';
