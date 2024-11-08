<?php
    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Models\Compra;
    use App\Models\DetalleCompra;
    use App\Models\Talla;
    use Illuminate\Support\Facades\Mail;
    use Illuminate\Support\Facades\Log;
    use App\Mail\PedidoRealizado;

    class CompraController extends Controller {
        public function listaCompra(Request $request) {
            Log::info('Datos recibidos para la compra:', $request->all());

            $validated = $request->validate([
                'email' => 'required|email',
                'total' => 'required|numeric',
                'productos' => 'required|array',
                'productos.*.id_prenda' => 'required|integer',
                'productos.*.talla' => 'required|string',
                'productos.*.precio' => 'required|string',
            ]);

            Log::info('Datos validados correctamente:');

            $compra = Compra::create([
                'email' => $request->email,
                'precio_total' => $request->total,
                'estado' => 'recibido',
            ]);

            Log::info('Compra creada con éxito:');

            foreach ($request->productos as $producto) {
                $talla = Talla::where('nombre', $producto['talla'])
                            ->where('prenda_id', $producto['id_prenda'])
                            ->first();

                if (!$talla) {
                    Log::error('Talla no encontrada');
                    continue;
                }

                DetalleCompra::create([
                    'id_compra' => $compra->id_compra,
                    'id_prenda' => $producto['id_prenda'],
                    'talla' => $producto['talla'],
                    'precio' => $producto['precio'],
                ]);

                if ($talla->stockPorPrenda > 0) {
                    $talla->stockPorPrenda -= 1;
                    $talla->save(); 
                    Log::info('Stock de la talla actualizado');
                } else {
                    Log::warning('Stock insuficiente para la talla');
                }
            }

            Log::info('Detalles de la compra guardados correctamente.');

            Mail::to($compra->email)->send(new PedidoRealizado($compra, $request->productos));

            Log::info('Correo enviado a: ' . $compra->email);

            return response()->json([
                'message' => 'Compra realizada con éxito',
                'compra' => $compra,
                'productos' => $request->productos,
            ], 201);
        }
    }