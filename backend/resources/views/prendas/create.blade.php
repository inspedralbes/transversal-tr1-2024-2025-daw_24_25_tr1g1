<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}"> 
    <title>Agregar Producto</title>
</head>
<body>
    <h1>Agregar PRENDA</h1>
    <form action="{{ route('prendas.store') }}" method="POST" enctype="multipart/form-data">
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

        <label for="tallas">Tallas:</label>
        <div>
            <label for="talla_s">S:</label>
            <input type="number" name="tallas[S]" id="talla_s" value="0" min="0">
            <label for="talla_m">M:</label>
            <input type="number" name="tallas[M]" id="talla_m" value="0" min="0">
            <label for="talla_l">L:</label>
            <input type="number" name="tallas[L]" id="talla_l" value="0" min="0">
            <label for="talla_xl">XL:</label>
            <input type="number" name="tallas[XL]" id="talla_xl" value="0" min="0">
        </div>
        <br>

        <label for="imagen">URL de la Imagen:</label>
        <input type="url" name="imagen" id="imagen" placeholder="https://example.com/imagen.jpg">
        <br>

        <button class="btn" type="submit">Guardar Prenda</button>
    </form>
    <a class="btn" href="{{ route('prendas.index') }}">Volver a la lista</a>
</body>
</html>
