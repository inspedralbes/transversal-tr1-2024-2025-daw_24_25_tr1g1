export async function getProductes() {
    const response = await fetch('./data.json'); // Ajuste aquí
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
}
