<?php
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\PasarDatosController;
    use App\Http\Controllers\CompraController;

    // API Gestionar prendas
    Route::prefix('prendas')->group(function () {
        Route::get('/', [PasarDatosController::class, 'listarPrendas'])->name('api.prendas.listar');
    });

    // Hacer compra
    Route::post('/compras', [CompraController::class, 'listaCompra'])->name('api.compras.lista');