import { createApp, ref, reactive, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ data: { categorias: [], productos: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const divActual = ref('portada');   
        const dropdownVisible = ref(false);
        const filtroSexo = ref(null);  
        const productosFiltrados = ref([]);  

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos; // Asegúrate de que productos se cargue correctamente
            console.log(infoTotal.data.categorias);
            console.log(infoTotal.data.productos); // Verificar que se cargan correctamente
        });
        
        function filtrarPrendas(sexo) {
            divActual.value = 'prendas';
            activeIndex.value = 0; 
            mostrar.value = true;  
            filtroSexo.value = sexo;  
            
            // Filtrar las prendas según el sexo seleccionado
            productosFiltrados.value = infoTotal.data.productos.filter(producto => producto.sexo === sexo);
            console.log(productosFiltrados.value); // Mostrar los productos filtrados en consola para depuración
        }

        function mostrarCategorias(index) {
            if (index >= 0 && index < infoTotal.data.categorias.length) {
                activeIndex.value = index;
                mostrar.value = true; 
                divActual.value = 'prendas'; 
                // Cargar las prendas de la categoría seleccionada
                productosFiltrados.value = infoTotal.data.categorias[index].prendas; 
                console.log(productosFiltrados.value); // Verificar que se cargan correctamente
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
            canviarDiv('botiga'); // Usar referencia directa a la función
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
            toggleDropdownAndNavigate,
            productosFiltrados // Asegúrate de devolver los productos filtrados
        };
    },
}).mount("#appVue");
