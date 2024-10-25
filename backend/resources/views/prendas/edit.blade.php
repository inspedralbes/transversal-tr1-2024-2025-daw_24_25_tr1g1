<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Producto</title>
</head>
<body>
    <h1>Editar Producto</h1>

    <form action="{{ route('prendas.update', $prenda->id_prenda) }}" method="POST">
        @csrf
        @method('PUT') <!-- Indica que es una solicitud de actualización -->
        
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" value="{{ old('nombre', $prenda->nombre) }}" required>
        <br>

        <label for="precio">Precio:</label>
        <input type="number" name="precio" id="precio" step="0.01" value="{{ old('precio', $prenda->precio) }}" required>
        <br>

        <label for="descripcion">Descripción:</label>
        <textarea name="descripcion" id="descripcion" required>{{ old('descripcion', $prenda->descripcion) }}</textarea>
        <br>

        <label for="descuento">Descuento:</label>
        <input type="number" name="descuento" id="descuento" step="0.01" value="{{ old('descuento', $prenda->descuento) }}">
        <br>

        <label for="categoria_id">Categoría:</label>
        <select name="categoria_id" id="categoria_id" required>
            @foreach($categorias as $categoria)
                <option value="{{ $categoria->id_categoria }}" {{ $categoria->id_categoria == $prenda->categoria_id ? 'selected' : '' }}>
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

        <button type="submit">Actualizar Producto</button>
    </form>

    <form action="{{ route('prendas.index') }}" method="GET" style="display:inline;">
    <button type="submit">Volver a la lista</button>
</form>
</body>
</html>
