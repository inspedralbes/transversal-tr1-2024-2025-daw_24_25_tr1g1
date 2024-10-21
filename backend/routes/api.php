<?php
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\GetDatosControlador;


    Route::get('/datos', [GetDatosControlador::class, 'obtenerDatos']);

    
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');

