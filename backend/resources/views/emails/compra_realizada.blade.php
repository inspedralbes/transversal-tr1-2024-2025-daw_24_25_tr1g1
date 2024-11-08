<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Compra</title>
</head>
<body>
    <h1>¡Gracias por tu compra!</h1>
    <p>Hemos recibido tu compra y aquí tienes los detalles:</p>
    <ul>
        <li><strong>Email:</strong> {{ $compra->email }}</li>
        <li><strong>Precio Total:</strong> {{ $compra->precio_total }}€</li>
        <li><strong>Estado:</strong> {{ $compra->estado }}</li>
    </ul>

    <h2>Detalles de Productos:</h2>
    <ul>
        @foreach($productosDetalles as $detalle)
            <li>
                <strong>Producto ID:</strong> {{ $detalle->id_prenda }}<br>
                <strong>Talla:</strong> {{ $detalle->talla }}<br>
                <strong>Precio:</strong> {{ $detalle->precio }}€
            </li>
        @endforeach
    </ul>

    <p>Te avisaremos cuando el estado de tu compra cambie. ¡Gracias por confiar en nosotros!</p>
</body>
</html>
