import { createApp, ref, reactive, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ data: { categorias: [], productos: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const filtroSexo = ref(null);
        const carrito = ref([]);
        const divActual = ref('portada');
        const productosFiltrados = ref([]);
        const tallaSeleccionada = ref(null);
        const prendaSeleccionada = ref(null);
        const correoElectronico = ref('');
        const carritoVisible = ref(false);
        const menuVisible = ref(false);

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos;
        });

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
            tallaSeleccionada.value = talla;
        }

        function agregarACesta(prenda, talla) {
            carrito.value.push({
                id_prenda: prenda.id_prenda,
                nombre: prenda.nombre,
                precio: prenda.precio,
                imagenes: prenda.imagenes,
                talla: talla,
            });
        }

        function quitarCesta(prenda) {
            const index = carrito.value.findIndex(item => item.id_prenda === prenda.id_prenda && item.talla === prenda.talla);
            if (index > -1) carrito.value.splice(index, 1);  
        }

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

        function finalizarCompra() {
            const total = totalCarrito();
            
            const datosCompra = {
                productos: carrito.value.map(item => ({
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
                    carrito.value = [];  
                    canviarDiv('compraRealizada');
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

        function totalCarrito() {
            let total = 0;

            for (let i = 0; i < carrito.value.length; i++) {
                const item = carrito.value[i];
                const precio = parseFloat(item.precio);
                total += precio;
            }
            return total;
        }

        function finalitzarCompra() {
            carritoVisible.value = false;
            canviarDiv('checkout');
        }

        return {
            infoTotal,
            carritoVisible, 
            irAlCheckout,
            mostrarCategorias,
            toggleCarritoLateral,
            canviarDiv,
            mostrarDiv,
            mostrar,
            activeIndex,
            filtroSexo,
            filtrarPrendas,
            productosFiltrados,
            agregarACesta,
            quitarCesta,
            carrito,
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
