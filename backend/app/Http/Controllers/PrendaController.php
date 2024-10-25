<?php
namespace App\Http\Controllers;

use App\Models\Prenda;
use App\Models\Categoria; // Importar el modelo Categoria
use Illuminate\Http\Request;

class PrendaController extends Controller
{
    public function index()
    {
        $prendas = Prenda::all();
        return view('prendas.index', compact('prendas'));
    }

    public function create()
    {
        $categorias = Categoria::all(); // obtengo todas las categorías
        return view('prendas.create', compact('categorias')); // paso las categorias a la view
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'precio' => 'required|numeric',
            'descripcion' => 'required',
            'descuento' => 'nullable|numeric', // opcional
            'categoria_id' => 'required|exists:categoria,id_categoria', //comprovar que existe
            'sexo' => 'required|in:M,F,U', // comprobvar que es M,F,U
        ]);

        Prenda::create($request->all());
        return redirect()->route('prendas.index')->with('success', 'PRENDA CREADA CON EXITO');
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
        return view('prendas.edit', compact('prenda', 'categorias')); // paso prenda y categorías a la vista
    }

    public function update(Request $request, $id)
{
    $request->validate([
        'nombre' => 'required',
        'precio' => 'required|numeric',
        'descripcion' => 'required',
        'descuento' => 'nullable|numeric', 
        'categoria_id' => 'required|exists:categoria,id_categoria', // que exista la categoría
        'sexo' => 'required|in:M,F,U', //que sea uno de los valores permitidos
    ]);

    $prenda = Prenda::findOrFail($id);
    $prenda->update($request->all()); // Actualizar la prenda
    return redirect()->route('prendas.index')->with('success', 'PRENDA ACTUALIZADA CON EXITO');
}
    public function destroy($id)
    {
        $prenda = Prenda::findOrFail($id);
        $prenda->delete();
        return redirect()->route('prendas.index')->with('success', 'PRENDA ELIMINADA CON EXITO');
    }
}
