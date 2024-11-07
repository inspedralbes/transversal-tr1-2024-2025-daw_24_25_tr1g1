<?php
    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Models\Compra;
    use App\Models\DetalleCompra;
    use Illuminate\Support\Facades\Mail;
    use App\Mail\PedidoRealizado;
    
    class CompraController extends Controller {
        public function listaCompra(Request $request) {
            // Validación de la entrada
            $request->validate([
                'email' => 'required|email',
                'total' => 'required|numeric',
                'productos' => 'required|array',
                'productos.*.id_prenda' => 'required|integer',
                'productos.*.talla' => 'required|string',
                'productos.*.precio' => 'required|string'
            ]);
    
            // Crear la entrada principal en la tabla 'compras'
            $compra = Compra::create([
                'email' => $request->email,
                'precio_total' => $request->total,
                'estado' => 'recibido',  // Añadido estado por defecto
            ]);
    
            // Crear detalles de compra
            foreach ($request->productos as $producto) {
                DetalleCompra::create([
                    'id_compra' => $compra->id_compra,
                    'id_prenda' => $producto['id_prenda'],
                    'talla' => $producto['talla'],
                    'precio' => $producto['precio'],  
                ]);
            }
    
            Mail::to($compra->email)->send(new PedidoRealizado($compra, $request->productos));
    
            return response()->json([
                'message' => 'Compra realizada con éxito',
                'compra' => $compra,  // Retornar los detalles de la compra
                'productos' => $request->productos  // Incluir los detalles de los productos en la respuesta
            ], 201);
        }
    }
    