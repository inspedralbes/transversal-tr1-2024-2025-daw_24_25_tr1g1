import { createApp, ref, reactive, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes, realizarCompra } from './comunicationManager.js';

createApp({
    setup() {
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
        const compraExitosa = reactive({
            productos: [],
            email: '',
            total: 0
        });
        const paginaActual = ref(1);
        const productosPorPagina = 3;

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos;
        })

        function productosPaginados() {
            const inicio = (paginaActual.value - 1) * productosPorPagina;
            const fin = inicio + productosPorPagina;
            return productosFiltrados.value.slice(inicio, fin);
        }
        function siguientePagina() {
            if ((paginaActual.value * productosPorPagina) < productosFiltrados.value.length) {
                paginaActual.value++;
            }
        }
        
        function paginaAnterior() {
            if (paginaActual.value > 1) {
                paginaActual.value--;
            }
        }
        ;

        function getValoracionRandom() {
            return Math.floor(Math.random() * 5) + 1;
        }


<<<<<<< HEAD
        //esta funcion comprueba si la prenda ya ha sido guardada
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
=======
        /* PAGINACIÓN */
        const productoXpagina = ref(4);
        const paginaActual = ref(1);

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
>>>>>>> af6b21d1e6212fecbe3818b3044fa2432ddc2146
            }
        }

        function paginaSiguiente() {
            if (paginaActual.value < totalPaginas()) {
                paginaActual.value++;
                paginacion();
            }
        }
        /* FIN PAGINACION */

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

        }

        function mostrarCategorias(index) {
            if (index >= 0 && index < infoTotal.data.categorias.length) {
                activeIndex.value = index;
                mostrar.value = true;
                productosFiltrados.value = infoTotal.data.categorias[index].prendas;
                paginaActual.value = 1;
                divActual.value = 'prendas';
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
            Swal.fire({
                title: 'Producto añadido',
                text: `Has añadido "${prenda.nombre}" a la cesta`,
                icon: 'success',
                timer: 1000,
                showConfirmButton: false,
                position: 'bottom-end',
                toast: true,
                background: '#fff',
                timerProgressBar: true
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

        async function finalizarCompra() {
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

            try {
                console.log("Datos a enviar:", JSON.stringify(datosCompra));
                const data = await realizarCompra(datosCompra);

<<<<<<< HEAD
            //            http://tr1g1.daw.inspedralbes.cat/public/api/compras
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
=======
                compraExitosa.productos = carrito.slice();
                compraExitosa.email = correoElectronico.value;
                compraExitosa.total = total;
                canviarDiv('divFinal');
                carrito.splice(0, carrito.length);
            } catch (error) {
                console.error('Error al finalizar la compra:', error);
            }
>>>>>>> af6b21d1e6212fecbe3818b3044fa2432ddc2146
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
<<<<<<< HEAD
            infoTotal, likes, mostrarLikes, toggleLike, isLiked, carritoVisible, toggleCarritoLateral, mostrarCategorias, canviarDiv, mostrarDiv, mostrar, activeIndex, filtroSexo, filtrarPrendas,productosPaginados,siguientePagina,paginaAnterior,paginaActual,productosPorPagina, productosFiltrados, agregarACesta, quitarCesta, carrito, verInfoPrenda, prendaSeleccionada, tallaSeleccionada, seleccionarTalla, finalizarCompra, correoElectronico, totalCarrito, compraExitosa
=======
            infoTotal, finalizarCompra, getValoracionRandom, carritoVisible, toggleCarritoLateral, mostrarCategorias, canviarDiv, mostrarDiv, mostrar, activeIndex, filtroSexo, filtrarPrendas, productosFiltrados, agregarACesta, quitarCesta, carrito, verInfoPrenda, prendaSeleccionada, tallaSeleccionada, seleccionarTalla, finalizarCompra, correoElectronico, totalCarrito, compraExitosa
            , paginaAnterior, paginaSiguiente, totalPaginas,
            paginaActual, productoXpagina
>>>>>>> af6b21d1e6212fecbe3818b3044fa2432ddc2146
        };
    },
}).mount("#appVue");