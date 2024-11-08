export async function getProductes() {
    const response = await fetch('./data.json'); // Ajuste aquí
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}

export async function realizarCompra(datosCompra){
    const response = await fetch('http://tr1g1.daw.inspedralbes.cat/public/api/compras', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosCompra),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}