import { createApp, ref, reactive, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        // Reacción y referencia de variables
        const infoTotal = reactive({ data: { categorias: [], productos: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const filtroSexo = ref(null);
        const carritoVisible = ref(false);
        const carrito = reactive([]);
        const divActual = ref('portada');
        const productosFiltrados = ref([]);
        const tallaSeleccionada = ref(null);
        const prendaSeleccionada = ref(null);
        const correoElectronico = ref('');
        const errorEmail = ref('');
        const likes = reactive([]);
        const currentIndex = ref(0);

        const compraExitosa = reactive({
            productos: [],
            email: '',
            total: 0
        });

        // Nueva propiedad para el índice actual de la imagen en el slider
     
        // Carga de datos al montar el componente
        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos;
        });

        // Función para mover el slider a la izquierda
        function slideIzq() {
            if (prendaSeleccionada.value && currentIndex.value > 0) {
                currentIndex.value--;
            }
        }

        // Función para mover el slider a la derecha
        function slideDer() {
            if (prendaSeleccionada.value && currentIndex.value < prendaSeleccionada.value.imagenes.length - 1) {
                currentIndex.value++;
            }
        }

        function toggleLike(prenda) {
            let encontrado = false;
            for (let i = 0; i < likes.length; i++) {
                if (likes[i].id_prenda === prenda.id_prenda) {
                    likes.splice(i, 1);
                    encontrado = true;
                }
            }
            if (!encontrado) {
                likes.push(prenda);
            }
        }

        function isLiked(prenda) {
            for (let i = 0; i < likes.length; i++) {
                if (likes[i].id_prenda === prenda.id_prenda) {
                    return true;
                }
            }
            return false;
        }

        function mostrarLikes() {
            if (likes.length === 0) {
                Swal.fire({
                    text: `No tienes productos guardados`,
                    timer: 4000,
                    showConfirmButton: false,
                    position: 'top-start',
                    toast: true,
                    background: '#fff',
                });
            }
            productosFiltrados.value = likes;
            divActual.value = 'likes';
        }

        function filtrarPrendas(sexo) {
            filtroSexo.value = sexo;
            if (activeIndex.value !== null) {
                const prendas = infoTotal.data.categorias[activeIndex.value].prendas;
                const productosFiltradosTemp = [];
                for (let i = 0; i < prendas.length; i++) {
                    const producto = prendas[i];
                    if (!sexo || producto.sexo === sexo) {
                        productosFiltradosTemp.push(producto);
                    }
                }
                productosFiltrados.value = productosFiltradosTemp;
            }
            divActual.value = 'prendas';
        }

        function mostrarCategorias(index) {
            if (index >= 0 && index < infoTotal.data.categorias.length) {
                activeIndex.value = index;
                mostrar.value = true;
                divActual.value = 'prendas';
                productosFiltrados.value = infoTotal.data.categorias[index].prendas;
            }
        }

        function mostrarDiv(id) {
            return id === divActual.value;
        }

        function canviarDiv(nouDiv) {
            divActual.value = nouDiv;
            mostrar.value = false;
        }

      function seleccionarTalla(talla) {
    // Si la talla seleccionada actualmente es la misma que la clickeada, deseleccionamos
    tallaSeleccionada.value = tallaSeleccionada.value === talla ? null : talla;
}

function agregarACesta(prenda, talla) {
    // Verifica si la talla está seleccionada
    if (!talla) {
        // Mostrar alerta si no hay una talla seleccionada
        Swal.fire({
            title: 'Selecciona una talla',
            text: `Por favor, selecciona una talla antes de añadir "${prenda.nombre}" a la cesta.`,
            icon: 'warning',
            timer: 3000,
            showConfirmButton: false,
            position: 'bottom-end',
            toast: true,
            background: '#fff',
            timerProgressBar: true
        });
        return; // Salir de la función si no hay talla seleccionada
    }

    // Agregar producto con la talla seleccionada al carrito
    carrito.push({
        id_prenda: prenda.id_prenda,
        nombre: prenda.nombre,
        precio: prenda.precio,
        imagenes: prenda.imagenes,
        talla: talla.nombre, // Solo guardamos el nombre de la talla
    });

    // Confirmación de que el producto se ha añadido al carrito
    Swal.fire({
        title: 'Producto añadido',
        text: `Has añadido "${prenda.nombre}" en talla "${talla.nombre}" a la cesta.`,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
        position: 'bottom-end',
        toast: true,
        background: '#fff',
        timerProgressBar: true
    });

    // No restablecer la talla seleccionada para que no se pierda
}

        function quitarCesta(prenda) {
            const index = carrito.findIndex(item => item.id_prenda === prenda.id_prenda && item.talla === prenda.talla);
            if (index > -1) carrito.splice(index, 1);
        }

        // Funciones de manejo de información de productos
        function verInfoPrenda(prenda) {
            if (prenda) {
                prendaSeleccionada.value = prenda;
                if (prenda.tallas && prenda.tallas.length > 0) {
                    tallaSeleccionada.value = prenda.tallas[0].nombre;
                } else {
                    tallaSeleccionada.value = null;
                }
                canviarDiv('infoPrenda');
            }
        }

        function toggleCarritoLateral() {
            carritoVisible.value = !carritoVisible.value;
        }

        function finalizarCompra() {
            const total = totalCarrito();

            if (!correoElectronico.value) {
                errorEmail.value = "Escribe tu gmail";
                return;
            }

            const datosCompra = {
                productos: carrito.map(item => ({
                    id_prenda: item.id_prenda,
                    talla: typeof item.talla === 'object' ? item.talla.nombre : item.talla,
                    precio: item.precio.toString()
                })),
                total: total.toFixed(2),
                email: correoElectronico.value
            };

            console.log("Datos a enviar:", JSON.stringify(datosCompra));

            fetch('http://tr1g1.daw.inspedralbes.cat/public/api/compras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosCompra),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la compra');
                    }
                    return response.json();
                })
                .then(data => {
                    compraExitosa.productos = [];
                    for (const item of carrito) {
                        compraExitosa.productos.push(item);
                    }

                    compraExitosa.email = correoElectronico.value;
                    compraExitosa.total = total;
                    canviarDiv('divFinal');
                    carrito.splice(0, carrito.length);
                })
                .catch(error => {
                    console.error('Error al finalizar la compra:', error);
                });
        }

        function totalCarrito() {
            var total = 0;
            for (var i = 0; i < carrito.length; i++) {
                var item = carrito[i];
                var precio = parseFloat(item.precio);
                total += precio;
            }
            return total;
        }

        return {
            infoTotal, likes, mostrarLikes, toggleLike, isLiked, carritoVisible, toggleCarritoLateral, mostrarCategorias, canviarDiv, mostrarDiv, mostrar, activeIndex, filtroSexo, filtrarPrendas, productosFiltrados, agregarACesta, quitarCesta, carrito, verInfoPrenda, prendaSeleccionada, tallaSeleccionada, seleccionarTalla, finalizarCompra, correoElectronico, totalCarrito, compraExitosa, slideIzq, slideDer, currentIndex
        };
    },
}).mount("#appVue");
