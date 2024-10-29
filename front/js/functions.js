import { createApp, ref, reactive, computed, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ data: { categorias: [], productos: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const filtroSexo = ref(null);
        const carrito = reactive([]);
        const prendaAleatorios = ref([]);
        const divActual = ref('portada');
        const productosFiltrados = ref([]);
        const tallaSeleccionada = ref(null);
        const prendaSeleccionada = ref(null);
        const categoriasVisibles = ref(false);
        const carritoVisible = ref(false); // Nueva variable para controlar la visibilidad del carrito

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos;
            getProductoAleatorios();
        });

        function getProductoAleatorios() {
            const allProducts = infoTotal.data.categorias.flatMap(categoria => categoria.prendas);
            prendaAleatorios.value = allProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
        }

        function filtrarPrendas(sexo) {
            filtroSexo.value = sexo;
            if (activeIndex.value !== null) {
                productosFiltrados.value = infoTotal.data.categorias[activeIndex.value].prendas.filter(producto => !sexo || producto.sexo === sexo);
            }
            divActual.value = 'prendas';
        }

        function mostrarCategorias(index) {
            if (index >= 0 && index < infoTotal.data.categorias.length) {
                activeIndex.value = index;
                mostrar.value = true;
                productosFiltrados.value = infoTotal.data.categorias[index].prendas || [];
                divActual.value = 'prendas';
                categoriasVisibles.value = false; // Cierra el menú al seleccionar
            } else {
                console.error("Índice fuera de rango:", index);
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

        function verInfoPrenda(prenda) {
            if (prenda) {
                prendaSeleccionada.value = prenda;
                tallaSeleccionada.value = prenda.tallas?.length ? prenda.tallas[0].nombre : null;
                canviarDiv('infoPrenda');
            }
        }

        function toggleMenuLateral() {
            categoriasVisibles.value = !categoriasVisibles.value; 
        }

        function toggleCarrito() {
            carritoVisible.value = !carritoVisible.value; // Alterna la visibilidad del carrito
        }

        return {
            infoTotal,
            mostrarCategorias,
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
            getProductoAleatorios,
            prendaAleatorios,
            verInfoPrenda,
            prendaSeleccionada,
            tallaSeleccionada,
            seleccionarTalla,
            categoriasVisibles,
            toggleMenuLateral,
            carritoVisible,
            toggleCarrito // Exponemos la función para alternar el carrito
        };
    },
}).mount("#appVue");
