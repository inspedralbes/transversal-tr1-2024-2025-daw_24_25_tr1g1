<?php
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\PrendaController;
    use App\Http\Controllers\CompraController;
    use App\Http\Controllers\PedidoController;
    use App\Mail\PedidoRealizado;

    Route::prefix('crud')->group(function () {
        Route::resource('prendas', PrendaController::class);
    });

    // crud de los pedidos realizados
    Route::get('/pedidos', [PedidoController::class, 'index'])->name('pedidos.index');
    Route::get('/pedidos/{id}/edit', [PedidoController::class, 'edit'])->name('pedidos.edit');
    Route::put('/pedidos/{id}', [PedidoController::class, 'update'])->name('pedidos.update');
    Route::delete('/pedidos/{id}', [PedidoController::class, 'destroy'])->name('pedidos.destroy');

    Route::post('/compras', [CompraController::class, 'listaCompra'])->name('compras.create');
