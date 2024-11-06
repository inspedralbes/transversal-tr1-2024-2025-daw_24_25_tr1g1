<?php
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\PrendaController;
    use App\Http\Controllers\CompraController;
    use App\Http\Controllers\PedidoController;
    use App\Mail\PedidoRealizado;

    Route::prefix('crood')->group(function () {
        Route::resource('prendas', PrendaController::class);
    });

    // CROOD de los pedidos realizados
    Route::get('/pedidos', [PedidoController::class, 'index'])->name('pedidos.index');
    Route::get('/pedidos/{id}/edit', [PedidoController::class, 'edit'])->name('pedidos.edit');
    Route::put('/pedidos/{id}', [PedidoController::class, 'update'])->name('pedidos.update');
    Route::delete('/pedidos/{id}', [PedidoController::class, 'destroy'])->name('pedidos.destroy');

    Route::get('/correo-de-prueba', function () {
        // Datos de prueba
        $compra = (object)[
            'email' => '', // Correo real
            'precio_total' => 120.00,
            'estado' => 'recibido'
        ];
    
        $productosDetalles = [
            (object)['id_prenda' => 1, 'talla' => 'XL', 'precio' => 40.00],
            (object)['id_prenda' => 2, 'talla' => 'XXL', 'precio' => 80.00]
        ];
    
        // Enviar el correo
        Mail::to($compra->email)->send(new PedidoRealizado($compra, $productosDetalles));
    
        return 'Correo de prueba enviado a la compañera!';
    });