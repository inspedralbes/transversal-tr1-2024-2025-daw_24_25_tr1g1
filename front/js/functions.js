import { createApp, ref, reactive, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        // Reacción y referencia de variables
        const infoTotal = reactive({ data: { categorias: [], productos: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const filtroSexo = ref(null);
        const carritoVisible=ref(false);
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

        // Carga de datos al montar el componente
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

        function toggleCarritoLateral (){
            carritoVisible.value=!carritoVisible.value;
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
                    precio: item.precio
                })),
                total: parseFloat(total.toFixed(2)),
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

            watch(correoElectronico, (val) => {
                if (val) errorEmail.value = '';
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
            infoTotal,toggleCarritoLateral, mostrarCategorias, canviarDiv, mostrarDiv, mostrar, activeIndex,filtroSexo, filtrarPrendas, productosFiltrados, agregarACesta, quitarCesta,carrito, verInfoPrenda, prendaSeleccionada, tallaSeleccionada,seleccionarTalla, finalizarCompra, correoElectronico,totalCarrito, compraExitosa
        };
    },
}).mount("#appVue");
