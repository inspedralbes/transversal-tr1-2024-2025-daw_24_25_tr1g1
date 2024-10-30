import { createApp, ref, reactive, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        // Reacción y referencia de variables
        const infoTotal = reactive({ data: { categorias: [], productos: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const filtroSexo = ref(null);
        const carrito = reactive([]);
        const prendaAleatorios = ref([]);
        const divActual = ref('portada');
        const dropdownVisible = ref(false);
        const productosFiltrados = ref([]);
        const tallaSeleccionada = ref(null);
        const prendaSeleccionada = ref(null);
        const correoElectronico = ref('');

        // Carga de datos al montar el componente
        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos;
            getProductoAleatorios();
        });

        // Funciones de manejo de productos
        function getProductoAleatorios() {
            const allProducts = [];

            for (let i = 0; i < infoTotal.data.categorias.length; i++) {
                const categoria = infoTotal.data.categorias[i];

                for (let j = 0; j < categoria.prendas.length; j++) {
                    allProducts.push(categoria.prendas[j]);
                }
            }
            prendaAleatorios.value = allProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
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

        // Funciones de manejo del carrito
        function seleccionarTalla(talla) {
            tallaSeleccionada.value = talla;
        }

        function agregarACesta(prenda, talla) {
            carrito.push({
                id_prenda: prenda.id_prenda,
                nombre: prenda.nombre,
                precio: prenda.precio,
                imagenes: prenda.imagenes,
                talla: talla,
            });
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

        // Funciones de compra
        function finalizarCompra() {
            const total = totalCarrito();

            const datosCompra = {
                productos: carrito.map(item => ({
                    id_prenda: item.id_prenda,
                    talla: item.talla,
                    precio: item.precio
                })),
                total: total,
                email: correoElectronico.value
            };
            console.log(datosCompra);

            fetch('TU_URL_DE_API/aqui', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosCompra),
            })
                .then(response => {
                    if (!response.ok) {
                        console.log('Error en la compra');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Compra realizada con éxito:', data);
                })
                .catch(error => {
                    console.error('Error al finalizar la compra:', error);
                });
        }

        // Función para calcular el total del carrito
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
            infoTotal, 
            mostrarCategorias, 
            canviarDiv,
            mostrarDiv, 
            mostrar,
            activeIndex, 
            dropdownVisible, 
            filtroSexo, 
            filtrarPrendas, 
            productosFiltrados,
            agregarACesta, 
            quitarCesta, 
            carrito, 
            getProductoAleatorios, 
            prendaAleatorios,
            verInfoPrenda, 
            prendaSeleccionada, 
            tallaSeleccionada, 
            seleccionarTalla,
            finalizarCompra, 
            correoElectronico, 
            totalCarrito
        };
    },
}).mount("#appVue");
