<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compra;
use App\Models\DetalleCompra;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\PedidoRealizado;

class CompraController extends Controller
{
    public function listaCompra(Request $request)
    {
        // Log de los datos recibidos
        Log::info('Datos recibidos para la compra:', $request->all());

        // Validación de la entrada
        $validated = $request->validate([
            'email' => 'required|email',
            'total' => 'required|numeric',
            'productos' => 'required|array',
            'productos.*.id_prenda' => 'required|integer',
            'productos.*.talla' => 'required|string',
            'productos.*.precio' => 'required|string',
        ]);

        Log::info('Datos validados correctamente:', $validated);

        // Crear la compra
        $compra = Compra::create([
            'email' => $request->email,
            'precio_total' => $request->total,
            'estado' => 'recibido',
        ]);

        Log::info('Compra creada con éxito:', ['compra_id' => $compra->id_compra]);

        // Crear los detalles de la compra
        foreach ($request->productos as $producto) {
            DetalleCompra::create([
                'id_compra' => $compra->id_compra,
                'id_prenda' => $producto['id_prenda'],
                'talla' => $producto['talla'],
                'precio' => $producto['precio'],
            ]);
        }

        Log::info('Detalles de la compra guardados correctamente.');

        // Enviar el correo con la confirmación de compra
        Mail::to($compra->email)->send(new PedidoRealizado($compra, $request->productos));

        Log::info('Correo enviado a: ' . $compra->email);

        // Respuesta final
        return response()->json([
            'message' => 'Compra realizada con éxito',
            'compra' => $compra,
            'productos' => $request->productos,
        ], 201);
    }
}