<?php
    namespace App\Http\Controllers;

    use App\Models\Imagen;
    use Illuminate\Http\Request;

    class ImagenController extends Controller {
        public function index()
        {
            // Obtener imágenes con info de las prendas relacionadas
            $imagenes = Imagen::with('prenda')->get();
            return response()->json($imagenes);
        }
    }