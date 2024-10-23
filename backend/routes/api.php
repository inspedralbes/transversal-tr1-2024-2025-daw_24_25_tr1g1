<?php
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\PasarDatosController;


    Route::get('/datos', [PasarDatosController::class, 'listarPrendas']);

    
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

