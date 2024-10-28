<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}"> 
    <title>Editar Producto</title>
</head>
<body>
    <h1>Editar Producto</h1>

    <form action="{{ route('prendas.update', $prenda->id_prenda) }}" method="POST">
        @csrf
        @method('PUT')

        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" value="{{ old('nombre', $prenda->nombre) }}" required>
        <br>

        <label for="precio">Precio:</label>
        <input type="number" name="precio" id="precio" step="0.01" value="{{ old('precio', $prenda->precio) }}" required>
        <br>

        <label for="descripcion">Descripción:</label>
        <textarea name="descripcion" id="descripcion" required>{{ old('descripcion', $prenda->descripcion) }}</textarea>
        <br>

        <label for="categoria_id">Categoría:</label>
        <select name="categoria_id" id="categoria_id" required>
            @foreach ($categorias as $categoria)
                <option value="{{ $categoria->id_categoria }}" {{ $prenda->categoria_id == $categoria->id_categoria ? 'selected' : '' }}>
                    {{ $categoria->nombre }}
                </option>
            @endforeach
        </select>
        <br>

        <label for="sexo">Sexo:</label>
        <select name="sexo" id="sexo" required>
            <option value="M" {{ $prenda->sexo == 'M' ? 'selected' : '' }}>Masculino</option>
            <option value="F" {{ $prenda->sexo == 'F' ? 'selected' : '' }}>Femenino</option>
            <option value="U" {{ $prenda->sexo == 'U' ? 'selected' : '' }}>Unisex</option>
        </select>
        <br>

        <label for="imagen">URL de la Imagen:</label>
        <input type="url" name="imagen" id="imagen" value="{{ old('imagen', $prenda->imagenes->first()->url ?? '') }}">
        <br>

        <h3>Editar Stock de Tallas</h3>
        @foreach ($prenda->tallas as $talla)
            <label for="talla_{{ $talla->id_talla }}">Talla {{ $talla->nombre }}:</label>
            <input type="number" name="tallas[{{ $talla->id_talla }}][stock]" id="talla_{{ $talla->id_talla }}" 
                   value="{{ old('tallas.' . $talla->id_talla . '.stock', $talla->stockPorPrenda) }}" min="0">
            <br>
        @endforeach

        <h4>Añadir Stock a Otras Tallas</h4>
        @foreach (['S', 'M', 'L', 'XL'] as $tallaNombre)
            @if (!$prenda->tallas->where('nombre', $tallaNombre)->first())
                <label for="nueva_talla_{{ $tallaNombre }}">Talla {{ $tallaNombre }}:</label>
                <input type="number" name="tallas[{{ $tallaNombre }}][stock]" id="nueva_talla_{{ $tallaNombre }}" value="0" min="0">
                <br>
            @endif
        @endforeach

        <button class="btn" type="submit">Actualizar Producto</button>
    </form>

    <form action="{{ route('prendas.index') }}" method="GET">
        <button class="btn" type="submit">Volver a la lista</button>
    </form>
</body>
</html>
