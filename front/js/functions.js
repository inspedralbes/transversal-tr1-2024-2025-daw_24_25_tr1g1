import { createApp, ref, reactive, computed, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ data: { categorias: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const divActual = ref('portada');
        const filtroSexo = ref(null);
        const prendaFiltrados = ref([]);
        const carrito = reactive([]);
        const prendaAleatorios = ref([]);

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            getProductoAleatorios();
        });

        function getProductoAleatorios() {
            const allProducts = infoTotal.data.categorias.flatMap(categoria => categoria.prendas);
            prendaAleatorios.value = allProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
        }

        const categoriaActual = computed(() => infoTotal.data.categorias[activeIndex.value] || null);

        function filtrarPrendas(sexo) {
            divActual.value = 'botiga';
            filtroSexo.value = sexo;
            prendaFiltrados.value = infoTotal.data.categorias[activeIndex.value].prendas.filter(prenda =>
                !sexo || prenda.sexo === sexo
            );
        }
        

        function mostrarCategorias(index) {
            if (index >= 0 && index < infoTotal.data.categorias.length) {
                activeIndex.value = index;
                mostrar.value = true;
                divActual.value = 'botiga';
                filtroSexo.value = null;
                // Llamamos a filtrarPrendas sin filtro para mostrar todas las prendas de la categoría
                filtrarPrendas('');
            }
        }
        
        

        function mostrarDiv(id) { return id === divActual.value; }

        function canviarDiv(nouDiv) {
            divActual.value = nouDiv;
            mostrar.value = false;
        }

        function agregarACesta(prenda) { carrito.push(prenda); }
        
        function quitarCesta(prenda) {
            const index = carrito.findIndex(item => item.id_prenda === prenda.id_prenda);
            if (index > -1) carrito.splice(index, 1);
        }

        function enviarFormulario() {
            alert("Gracias por contactarnos. Tu mensaje ha sido enviado con éxito.");
            canviarDiv('portada');
        }

        return {
            infoTotal, 
            categoriaActual, 
            prendaAleatorios, 
            enviarFormulario,
            getProductoAleatorios, 
            mostrarCategorias, 
            canviarDiv, 
            mostrarDiv,
            mostrar, 
            activeIndex,
            filtroSexo, 
            filtrarPrendas, 
            prendaFiltrados,
            agregarACesta, 
            quitarCesta, 
            carrito
        };
    },
}).mount("#appVue");
