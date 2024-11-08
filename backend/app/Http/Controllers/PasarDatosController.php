<?php
    namespace App\Http\Controllers;

    use App\Models\Talla;
    use App\Models\Prenda;
    use App\Models\Imagenes;
    use App\Models\Categoria;
    use Illuminate\Http\Request;

    class PasarDatosController extends Controller
    {
        public function listarPrendas()
        {
            // Cojer categoria con sus prendas
            $categorias = Categoria::with(['prendas.tallas', 'prendas.imagenes'])->get();

            $data = ['categorias' => []];

            foreach ($categorias as $categoria) {
                $categoriaData = [
                    'id_categoria' => $categoria->id_categoria,
                    'nombre' => $categoria->nombre,
                    'prendas' => []
                ];

                foreach ($categoria->prendas as $prenda) {
                    // Incluir talla para cada prenda
                    $tallasData = [];
                    foreach ($prenda->tallas as $talla) {
                        $tallasData[] = [
                            'id_talla' => $talla->id_talla,
                            'nombre' => $talla->nombre,
                            'stock' => $talla->stockPorPrenda,
                        ];
                    }

                    // Estructura de la prenda
                    $categoriaData['prendas'][] = [
                        'id_prenda' => $prenda->id_prenda,
                        'nombre' => $prenda->nombre,
                        'precio' => $prenda->precio,
                        'descripcion' => $prenda->descripcion,
                        'descuento' => $prenda->descuento,
                        'sexo' => $prenda->sexo,
                        'tallas' => $tallasData,
                        'imagenes' => $prenda->imagenes->pluck('url')
                    ];
                }

                $data['categorias'][] = $categoriaData;
            }

            return response()->json($data);
        }
    }