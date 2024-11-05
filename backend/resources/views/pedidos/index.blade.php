<h1>Listado de Pedidos</h1>

@if(session('success'))
<div class="success-message">
    {{ session('success') }}
</div>
@endif

<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($pedidos as $pedido)
            <tr>
                <td>{{ $pedido->id_compra }}</td>
                <td>{{ $pedido->email }}</td>
                <td>{{ $pedido->precio_total }}</td>
                <td>{{ ucfirst($pedido->estado) }}</td>
                <td>
                    <a href="{{ route('pedidos.edit', $pedido->id_compra) }}" class="btn">Cambiar Estado</a>
                    <form action="{{ route('pedidos.destroy', $pedido->id_compra) }}" method="POST" style="display:inline;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn">Eliminar</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>