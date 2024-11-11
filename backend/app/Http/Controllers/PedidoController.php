<?php
    namespace App\Http\Controllers;

    use Illuminate\Http\Request;
    use App\Models\Compra;
    use Illuminate\Support\Facades\Mail;
    use Illuminate\Support\Facades\Log;

    class PedidoController extends Controller {
        public function index() { // Mostrar todo
            Log::info('Mostrando todos los pedidos');
            $pedidos = Compra::all();
            return view('pedidos.index', compact('pedidos'));
        }

        public function edit($id) { // Mostrar formulario editar
            Log::info("Cargando formulario de edición para el pedido con ID: $id");
            $pedido = Compra::findOrFail($id);
            $estados = ['recibido', 'enviado', 'entregado'];
            return view('pedidos.edit', compact('pedido', 'estados'));
        }

        public function update(Request $request, $id) { // Actualizar pedido en la base de datos
            Log::info("Iniciando actualización del pedido con ID: $id");

            $request->validate([
                'estado' => 'required|in:recibido,enviado,entregado',
            ]);

        
            $pedido = Compra::findOrFail($id);
            $estadoAnterior = $pedido->estado; // Guardar el estado actual en una variable
            $nuevoEstado = $request->input('estado');

            $pedido->estado = $nuevoEstado; // Asignar el nuevo estado
            $pedido->save();

            try {
                Mail::raw("Su pedido ha cambiado de estado: de '$estadoAnterior' a '$nuevoEstado'.", function ($message) use ($pedido) {
                    $message->to($pedido->email)
                            ->subject('Actualización del estado de su pedido');
                });
                Log::info("Correo enviado correctamente a: " . $pedido->email);
            } catch (\Exception $e) {
                Log::error("Error al enviar el correo al cliente: " . $e->getMessage());
            }

            return redirect()->route('pedidos.index')->with([
                'success' => 'Pedido actualizado y correo enviado',
                'estadoAnterior' => $estadoAnterior
            ]);
        
        }

        public function destroy($id) { // Eliminar un pedido
            Log::info("Iniciando eliminación del pedido con ID: $id");

            try {
                $pedido = Compra::findOrFail($id);
                $pedido->delete();
                Log::info("Pedido con ID $id eliminado exitosamente");
                return redirect()->route('pedidos.index')->with('success', 'Pedido eliminado');
            } catch (\Exception $e) {
                Log::error("Error al eliminar el pedido con ID $id: " . $e->getMessage());
                return redirect()->route('pedidos.index')->with('error', 'No se pudo eliminar el pedido');
            }
        }
    }