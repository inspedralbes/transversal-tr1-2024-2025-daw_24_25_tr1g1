<?php
    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Models\Compra;
    use App\Models\DetalleCompra;

    class CompraController extends Controller
    {
        public function listaCompra(Request $request)
        {
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
            ]);

            // Crear detalles de compra
            foreach ($request->productos as $producto) {
                DetalleCompra::create([
                    'id_compra' => $compra->id_compra,
                    'id_prenda' => $producto['id_prenda'],
                    'talla' => $producto['talla'],
                ]);
            }

            return response()->json(['message' => 'Compra realizada con éxito', 'compra' => $compra], 201);
        }
    }