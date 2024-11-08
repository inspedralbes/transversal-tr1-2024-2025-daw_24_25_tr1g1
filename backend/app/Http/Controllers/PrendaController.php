<?php
    namespace App\Http\Controllers;

    use App\Models\Prenda;
    use App\Models\Categoria; 
    use App\Models\Talla; 
    use Illuminate\Http\Request;

    class PrendaController extends Controller {
        public function index() {
            $prendas = Prenda::with('tallas')->get(); 
            return view('prendas.index', compact('prendas'));
        }

        public function create() {
            $categorias = Categoria::all(); 
            return view('prendas.create', compact('categorias')); 
        }

        public function store(Request $request) {
            $request->validate([
                'nombre' => 'required',
                'precio' => 'required|numeric',
                'descripcion' => 'required',
                'descuento' => 'nullable|numeric',
                'categoria_id' => 'required|exists:categoria,id_categoria',
                'sexo' => 'required|in:M,F,U',
                'tallas' => 'required|array',
                'imagenes.*' => 'nullable|url', 
            ]);

            $prenda = Prenda::create($request->except('tallas', 'imagenes'));

            if ($request->has('imagenes')) {
                foreach ($request->imagenes as $url) {
                    if ($url) { 
                        $prenda->imagenes()->create(['url' => $url]);
                    }
                }
            }
            foreach ($request->tallas as $nombre => $stock) {
                if ($stock > 0) {
                    $prenda->tallas()->create(['nombre' => $nombre, 'stockPorPrenda' => $stock]);
                }
            }
            return redirect()->route('prendas.index')->with('success', 'Prenda creada con éxito');
        }


        public function show($id)
        {
            $prenda = Prenda::findOrFail($id);
            return view('prendas.show', compact('prenda'));
        }

        public function edit($id)
        {
            $prenda = Prenda::findOrFail($id);
            $categorias = Categoria::all(); 
            return view('prendas.edit', compact('prenda', 'categorias'));
        }

        public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required',
            'precio' => 'required|numeric',
            'descripcion' => 'required',
            'categoria_id' => 'required|exists:categoria,id_categoria',
            'sexo' => 'required|in:M,F,U',
            'imagenes.*' => 'nullable|url', 
        ]);

        $prenda = Prenda::findOrFail($id);

        $prenda->update($request->except('imagenes'));

        $imagenesExistentes = $prenda->imagenes;

        foreach ($request->imagenes as $index => $url) {
            if ($url) {
                if (isset($imagenesExistentes[$index])) {
                    $imagenesExistentes[$index]->update(['url' => $url]);
                } else {
                    $prenda->imagenes()->create(['url' => $url]);
                }
            } elseif (isset($imagenesExistentes[$index])) {
                $imagenesExistentes[$index]->delete();
            }
        }

        return redirect()->route('prendas.index')->with('success', 'Prenda actualizada con éxito');
    }


        public function destroy($id)
        {
            $prenda = Prenda::findOrFail($id);
            $prenda->delete();
            return redirect()->route('prendas.index')->with('success', 'Prenda eliminada con éxito');
        }
    }
