<!-- resources/views/pedidos/edit.blade.php -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cambiar Estado del Pedido</title>
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
</head>
<body>
    <h1>Cambiar Estado del Pedido</h1>

    <form action="{{ route('pedidos.update', $pedido->id_compra) }}" method="POST">
        @csrf
        @method('PUT')

        <label for="estado">Estado:</label>
        <select name="estado" id="estado">
            @foreach($estados as $estado)
                <option value="{{ $estado }}" {{ $pedido->estado == $estado ? 'selected' : '' }}>
                    {{ ucfirst($estado) }}
                </option>
            @endforeach
        </select>

        <button type="submit" class="btn">Actualizar</button>
    </form>

    <a href="{{ route('pedidos.index') }}" class="btn">Volver al listado</a>
</body>
</html>