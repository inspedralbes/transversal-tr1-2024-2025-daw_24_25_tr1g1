export async function getProductes() {
    const response = await fetch('http://tr1g1.daw.inspedralbes.cat/public/api/datos'); // Ajuste aquí
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}