import { createApp, ref, reactive, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ data: { categorias: [], productos: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const divActual = ref('portada');   
        const dropdownVisible = ref(false);    

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            console.log(infoTotal.data.categorias);
        });
        

        function mostrarCategorias(index) {
            if (index >= 0 && index < infoTotal.data.categorias.length) {
                activeIndex.value = index;
                mostrar.value = true; 
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

        function toggleDropdownAndNavigate() {
            dropdownVisible.value = !dropdownVisible.value;
            this.canviarDiv('botiga');
        }   

        return {
            infoTotal,
            mostrarCategorias,
            canviarDiv,
            mostrarDiv,
            mostrar,
            activeIndex,
            dropdownVisible,
            toggleDropdownAndNavigate
        };
    },
}).mount("#appVue");
