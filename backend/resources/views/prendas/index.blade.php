<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de Prendas</title>
</head>
<body>
    <h1>Listado de Prendas</h1>
    @if(session('success'))
        <div style="color: green;">{{ session('success') }}</div>
    @endif

    <form action="{{ route('prendas.create') }}" method="GET" style="display:inline;">
        <button type="submit">Agregar Producto</button>
    </form>

    <table border="1">
    <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Descripción</th>
        <th>Acciones</th>
    </tr>
    
    @foreach($prendas as $prenda)
        <tr>
            <td>{{ $prenda->id_prenda }}</td>
            <td>{{ $prenda->nombre }}</td>
            <td>{{ $prenda->precio }}</td>
            <td>{{ $prenda->descripcion }}</td>
            <td>
                <form action="{{ route('prendas.edit', $prenda->id_prenda) }}" method="GET" style="display:inline;">
                    <button type="submit">Editar</button>
                </form>
                <form action="{{ route('prendas.destroy', $prenda->id_prenda) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit">Eliminar</button>
                </form>
            </td>
        </tr>
    @endforeach
</table>

</body>
</html>
