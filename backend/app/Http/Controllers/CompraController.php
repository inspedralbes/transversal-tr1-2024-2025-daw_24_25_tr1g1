<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Compra;
use App\Models\DetalleCompra;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log; // Para registrar logs
use App\Mail\PedidoRealizado;
use Illuminate\Mail\Envelope;

class CompraController extends Controller
{
    public function listaCompra(Request $request)
    {
        // Agregar log para ver los datos recibidos en la solicitud
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

        $compra = Compra::create([
            'email' => $request->email,
            'precio_total' => $request->total,
            'estado' => 'recibido',
        ]);

        Log::info('Compra creada con éxito:', ['compra_id' => $compra->id_compra]);

        foreach ($request->productos as $producto) {
            DetalleCompra::create([
                'id_compra' => $compra->id_compra,
                'id_prenda' => $producto['id_prenda'],
                'talla' => $producto['talla'],
                'precio' => $producto['precio'],
            ]);
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