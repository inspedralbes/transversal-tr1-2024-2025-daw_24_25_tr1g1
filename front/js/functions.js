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
        const divActual = ref('portada');
        const productosFiltrados = ref([]);
        const tallaSeleccionada = ref(null);
        const prendaSeleccionada = ref(null);
        const correoElectronico = ref('');
        const errorEmail = ref('');

        const compraExitosa = reactive({
            productos: [],
            email: '',
            total: 0
        });
        const productoXpagina = ref(4);
        const paginaActual = ref(1);

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos;
        });

        function totalPaginas() {
            const totalProductos = productosFiltrados.value.length;
            const paginas = totalProductos / productoXpagina.value;
            return paginas === parseInt(paginas) ? paginas : parseInt(paginas) + 1;
        }

        const paginacion = () => {
            const start = (paginaActual.value - 1) * productoXpagina.value;
            const end = start + productoXpagina.value;
            productosFiltrados.value = productosFiltrados.value.slice(start, end);
        };

        function paginaAnterior() {
            if (paginaActual.value > 1) {
                paginaActual.value--;
                paginacion();
            }
        }

        function paginaSiguiente() {
            if (paginaActual.value < totalPaginas()) {
                paginaActual.value++;
                paginacion();
            }
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

        // Función para mostrar el div correspondiente
        function mostrarDiv(id) {
            return id === divActual.value;
        }

        // Función para cambiar el div actual
        function canviarDiv(nouDiv) {
            divActual.value = nouDiv;
            mostrar.value = false;
        }

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

        function toggleCarritoLateral() {
            carritoVisible.value = !carritoVisible.value;
        }

        function irAlCheckout() {
            carritoVisible.value = false;
            canviarDiv('checkout');
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
        function finalitzarCompra(){
            this.carritoVisible=false;
            canviarDiv('checkout');
        }

        function iniciarSesion() {
            if (correo.value === '' || contrasena.value === '') {
                error.value = 'Por favor, completa todos los campos.';
                return;
            }
            error.value = '';

            if (correo.value === 'usuario@example.com' && contrasena.value === 'contraseña') {
                alert('Inicio de sesión exitoso');
                canviarDiv('portada'); 
            } else {
                error.value = 'Credenciales incorrectas.';
            }
        }
        

        return {
            infoTotal, carritoVisible, toggleCarritoLateral, mostrarCategorias, canviarDiv, mostrarDiv, mostrar, activeIndex, filtroSexo, filtrarPrendas, productosFiltrados, agregarACesta, quitarCesta, carrito, verInfoPrenda, prendaSeleccionada, tallaSeleccionada, seleccionarTalla, finalizarCompra, correoElectronico, totalCarrito, compraExitosa, paginaAnterior, paginaSiguiente, totalPaginas, paginacion
        };
    },
}).mount("#appVue");
