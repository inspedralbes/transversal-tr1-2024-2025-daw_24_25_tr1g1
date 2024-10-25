<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agregar Producto</title>
</head>
<body>
    <h1>Agregar PRENDA</h1>
    <form action="{{ route('prendas.store') }}" method="POST">
        @csrf
        
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" required>
        <br>

        <label for="precio">Precio:</label>
        <input type="number" name="precio" id="precio" step="0.01" required>
        <br>

        <label for="descripcion">Descripción:</label>
        <textarea name="descripcion" id="descripcion" required></textarea>
        <br>

        <label for="descuento">Descuento:</label>
        <input type="number" name="descuento" id="descuento" step="0.01">
        <br>

        <label for="categoria_id">Categoría:</label>
        <select name="categoria_id" id="categoria_id" required>
            @foreach($categorias as $categoria)
                <option value="{{ $categoria->id_categoria }}">{{ $categoria->nombre }}</option>
            @endforeach
        </select>
        <br>

        <label for="sexo">Sexo:</label>
        <select name="sexo" id="sexo" required>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="U">Unisex</option>
        </select>
        <br>

        <button type="submit">Guardar Prenda</button>
    </form>
    <form action="{{ route('prendas.index') }}" method="GET" style="display: inline;">
    <button type="submit">Volver a la lista</button>
    </form>
    </body>
</html>
