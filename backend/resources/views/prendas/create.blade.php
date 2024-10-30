<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}"> 
    <title>Agregar Prenda</title>
</head>
<body>
    <div class="form-container">
        <h1>Agregar Prenda</h1>
        <form action="{{ route('prendas.store') }}" method="POST" enctype="multipart/form-data">
            @csrf

            <label for="nombre">Nombre:</label>
            <input type="text" name="nombre" id="nombre" required>

            <label for="precio">Precio:</label>
            <input type="number" name="precio" id="precio" step="0.01" required>

            <label for="descripcion">Descripción:</label>
            <textarea name="descripcion" id="descripcion" required></textarea>

            <label for="descuento">Descuento:</label>
            <input type="number" name="descuento" id="descuento" step="0.01">

            <label for="categoria_id">Categoría:</label>
            <select name="categoria_id" id="categoria_id" required>
                @foreach($categorias as $categoria)
                    <option value="{{ $categoria->id_categoria }}">{{ $categoria->nombre }}</option>
                @endforeach
            </select>

            <label for="sexo">Sexo:</label>
            <select name="sexo" id="sexo" required>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="U">Unisex</option>
            </select>

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

            <label for="imagenes">URLs de Imágenes:</label>
            <div id="imagenes-container">
            <input type="url" name="imagenes[]" placeholder="url1" required>
            <input type="url" name="imagenes[]" placeholder="url2">
            <input type="url" name="imagenes[]" placeholder="url3">
            <input type="url" name="imagenes[]" placeholder="url4">
            </div>
          
            <button class="btn" type="submit">Guardar Prenda</button>
            <button type="button" class="btn" onclick="window.location.href='{{ route('prendas.index') }}'">Volver a la lista</button>
        </form>

        </div>
</body>
</html>
