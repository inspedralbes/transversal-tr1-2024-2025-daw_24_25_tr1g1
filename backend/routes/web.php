<?php
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\PrendaController;

    Route::prefix('crood')->group(function () {
        Route::resource('prendas', PrendaController::class);
    });

    Route::get('/', function () {
        return view('welcome');
    });