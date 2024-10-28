<?php
namespace App\Http\Controllers;

use App\Models\Prenda;
use App\Models\Categoria; 
use App\Models\Talla; 
use Illuminate\Http\Request;

class PrendaController extends Controller
{
    public function index()
    {
        $prendas = Prenda::with('tallas')->get(); 
        return view('prendas.index', compact('prendas'));
    }

    public function create()
    {
        $categorias = Categoria::all(); 
        return view('prendas.create', compact('categorias')); 
    }

    public function store(Request $request)
{
    // Validar datos
    $request->validate([
        'nombre' => 'required',
        'precio' => 'required|numeric',
        'descripcion' => 'required',
        'descuento' => 'nullable|numeric',
        'categoria_id' => 'required|exists:categoria,id_categoria',
        'sexo' => 'required|in:M,F,U',
        'tallas' => 'required|array',
        'imagen' => 'nullable|url', // Validar como URL
    ]);

    // Crear la prenda
    $prenda = Prenda::create($request->except('tallas', 'imagen'));

    // Guardar la URL de la imagen en la tabla `imagenes` si existe
    if ($request->has('imagen')) {
        $prenda->imagenes()->create(['url' => $request->imagen]); // Se guarda en la tabla imagenes
    }

    // Guardar tallas y stock
    foreach ($request->tallas as $nombre => $stock) {
        if ($stock > 0) {
            $prenda->tallas()->create(['nombre' => $nombre, 'stockPorPrenda' => $stock]);
        }
    }

    return redirect()->route('prendas.index')->with('success', 'PRENDA CREADA CON ÉXITO');
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
        'descuento' => 'nullable|numeric',
        'categoria_id' => 'required|exists:categoria,id_categoria',
        'sexo' => 'required|in:M,F,U',
        'tallas.*.stock' => 'nullable|numeric',
        'imagen' => 'nullable|url', // Validar como URL
    ]);

    $prenda = Prenda::findOrFail($id);
    $prenda->update($request->except('tallas', 'imagen')); // Actualiza otros campos

    // Actualizar el stock de las tallas
    foreach ($request->tallas as $id_talla => $data) {
        $tallaPrenda = $prenda->tallas()->where('id_talla', $id_talla)->first();
        if ($tallaPrenda) {
            if ($data['stock'] > 0) {
                $tallaPrenda->stockPorPrenda = $data['stock'];
                $tallaPrenda->save();
            } else {
                $tallaPrenda->delete();
            }
        } elseif ($data['stock'] > 0) {
            $prenda->tallas()->create([
                'id_talla' => $id_talla,
                'stockPorPrenda' => $data['stock'],
                'nombre' => $id_talla, // Asegúrate de agregar el nombre de la talla
            ]);
        }
    }

    // Actualiza la URL de la imagen si existe
    if ($request->has('imagen')) {
        $prenda->imagenes()->updateOrCreate(
            ['prenda_id' => $prenda->id_prenda], // Busca la imagen de la prenda
            ['url' => $request->imagen] // Actualiza la URL de la imagen
        );
    }

    return redirect()->route('prendas.index')->with('success', 'PRENDA ACTUALIZADA CON ÉXITO');
}



    
    

    public function destroy($id)
    {
        $prenda = Prenda::findOrFail($id);
        $prenda->delete();
        return redirect()->route('prendas.index')->with('success', 'PRENDA ELIMINADA CON EXITO');
    }
}
