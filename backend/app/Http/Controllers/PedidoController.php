<?php
    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Models\Compra;

    class PedidoController extends Controller {
        public function index() { // Mostrar todo
            $pedidos = Compra::all();
            return view('pedidos.index', compact('pedidos'));
        }

        public function edit($id) { // Mostrar formulario editar
            $pedido = Compra::findOrFail($id);
            $estados = ['recibido', 'enviado', 'entregado'];
            return view('pedidos.edit', compact('pedido', 'estados'));
        }

        public function update(Request $request, $id) { // Actualizar pedido base datos
            $request->validate([
                'estado' => 'required|in:recibido,enviado,entregado',
            ]);

            $pedido = Compra::findOrFail($id);
            $pedido->estado = $request->input('estado'); // Asignar el nuevo estado
            $pedido->save();

            return redirect()->route('pedidos.index')->with('success', 'Pedido actualizado');
        }

        public function destroy($id) { // Eliminar un pedido
            $pedido = Compra::findOrFail($id);
            $pedido->delete();

            return redirect()->route('pedidos.index')->with('success', 'Pedido eliminado');
        }
    }