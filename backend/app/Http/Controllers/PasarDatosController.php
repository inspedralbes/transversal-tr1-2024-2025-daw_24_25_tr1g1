<?php
    namespace App\Http\Controllers;

    use App\Models\Talla;
    use App\Models\Prenda;
    use App\Models\Imagenes;
    use App\Models\Categoria;
    use Illuminate\Http\Request;

    class PasarDatosController extends Controller {
        public function listarPrendas() {
            $categorias = Categoria::with(['prendas.talla', 'prendas.imagenes'])->get();

            $data = [ 'categorias' => [] ];

            foreach ($categorias as $categoria) {
                $categoriaData = [' id_categoria' => $categoria->id_categoria,'nombre' => $categoria->nombre,'prendas' => [] ];

                foreach ($categoria->prendas as $prenda) {
                    $categoriaData['prendas'][] = [
                        'id_prenda' => $prenda->id_prenda,
                        'nombre' => $prenda->nombre,
                        'precio' => $prenda->precio,
                        'descripcion' => $prenda->descripcion,
                        'descuento' => $prenda->descuento,
                        'sexo' => $prenda->sexo,
                        'talla' => [
                            'id_talla' => $prenda->talla->id_talla,
                            'nombre' => $prenda->talla->nombre,
                            'stock' => $prenda->talla->stockPorPrenda,
                        ],
                        'imagenes' => $prenda->imagenes->pluck('url')
                    ];
                }

                $data['categorias'][] = $categoriaData;
            }

            return response()->json($data);
        }
    }