<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de Prendas</title>
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
</head>
<body>
    <h1>Listado de Prendas</h1>
    @if(session('success'))
    <div class="success-message">
        {{ session('success') }}
    </div>
    @endif
    
    <a href="{{ route('prendas.create') }}" class="btn">Agregar Prenda</a>

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Imágenes</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($prendas as $prenda)
                <tr>
                    <td>{{ $prenda->id_prenda }}</td>
                    <td>{{ $prenda->nombre }}</td>
                    <td>{{ $prenda->precio }}</td>
                    <td>{{ $prenda->descripcion }}</td>
                    <td>
                        @if($prenda->imagenes->isNotEmpty())
                            <div class="imagenes">
                                @foreach($prenda->imagenes as $imagen)
                                    <img src="{{ $imagen->url }}" alt="{{ $prenda->nombre }}" style="width: 100px; height: 100px; margin: 2px;">
                                @endforeach
                            </div>
                        @else
                            No disponible
                        @endif
                    </td>
                    <td>
                        <a href="{{ route('prendas.edit', $prenda->id_prenda) }}" class="btn">Editar</a>
                        <form action="{{ route('prendas.destroy', $prenda->id_prenda) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn">Eliminar</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <h1>Listado de Tallas</h1>
    <table>
        <thead>
            <tr>
                <th>ID Talla</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>ID Prenda</th>
            </tr>
        </thead>
        <tbody>
            @foreach($prendas as $prenda)
                @foreach($prenda->tallas as $talla)
                    <tr>
                        <td>{{ $talla->id_talla }}</td>
                        <td>{{ $talla->nombre }}</td>
                        <td>{{ $talla->stockPorPrenda }}</td>
                        <td>{{ $prenda->id_prenda }}</td>
                    </tr>
                @endforeach
            @endforeach
        </tbody>
    </table>
</body>
</html>
