import { createApp, ref, reactive, computed, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ data: { categorias: [], prendas: [] } });
        const currentPage = ref(0);
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const cantidadTotal = ref(0);
        const filtroSexo = ref(null);
        const carrito = reactive([]);
        const prendaFiltrados = ref([]);
        const prendaAleatorios = ref([]);
        const divActual = ref('portada');
        const dropdownVisible = ref(false);

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            data.categorias.forEach(categoria => {
                infoTotal.data.prendas.push(...categoria.prendas);
            });

            obtenerPrendasAleatorias();
        });
        

        function obtenerPrendasAleatorias() {
            const todasLasPrendas = infoTotal.data.prendas;
            if (!todasLasPrendas || todasLasPrendas.length === 0) {
                console.error("No hay prendas disponibles.");
                return;
            }
            const barajado = todasLasPrendas.sort(() => 0.5 - Math.random());
            prendaAleatorios.value = barajado.slice(0, 6);
        }

        const categoriaActual = computed(() => {
            return infoTotal.data.categorias[currentPage.value] || null;
        });

        function filtrarPrendas() {
            divActual.value = 'prendas';
            activeIndex.value = 0;
            mostrar.value = true;
        }
        

        function mostrarCategorias(index) {
            if (index >= 0 && index < infoTotal.data.categorias.length) {
                activeIndex.value = index;
                mostrar.value = true;
                divActual.value = 'prendas';
                prendaFiltrados.value = infoTotal.data.categorias[index].prendas;
            }
        }

        function mostrarDiv(id) {
            return id === divActual.value;
        }

        function cambiarDiv(nuevoDiv) {
            divActual.value = nuevoDiv;
            mostrar.value = false;
        }

        function agregarACesta(prenda) {
            carrito.push(prenda);
            cantidadTotal.value++;
        }

        function quitarCesta(prenda) {
            const index = carrito.indexOf(prenda);
            if (index > -1) {
                carrito.splice(index, 1);
                cantidadTotal.value--;
            }
        } 

        return {
            infoTotal,categoriaActual,prendaAleatorios,obtenerPrendasAleatorias,
            mostrarCategorias,cambiarDiv,mostrarDiv,mostrar,activeIndex,
            dropdownVisible,filtroSexo,filtrarPrendas,prendaFiltrados,
            agregarACesta,quitarCesta,carrito,cantidadTotal
        };
    },
}).mount("#appVue");