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
        const carrito = reactive([]); 

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos; // Corrección aquí
            console.log(infoTotal.data.categorias);
            console.log(infoTotal.data.productos); 
        });
        
        function filtrarPrendas(sexo) {
            divActual.value = 'prendas';
            activeIndex.value = 0; 
            mostrar.value = true;  
            filtroSexo.value = sexo;  
            productosFiltrados.value = infoTotal.data.productos.filter(producto => producto.sexo === sexo);
            console.log(productosFiltrados.value); 
        }

        function mostrarCategorias(index) {
            if (index >= 0 && index < infoTotal.data.categorias.length) {
                activeIndex.value = index;
                mostrar.value = true; 
                divActual.value = 'prendas'; 
                productosFiltrados.value = infoTotal.data.categorias[index].prendas; 
                console.log(productosFiltrados.value);
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
            canviarDiv('botiga');
        }   

        function agregarACesta(prenda) {
            carrito.push(prenda); 
            console.log(carrito); 
        }

        function quitarCesta(prenda) {
            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].id === prenda.id) { // Compara por id
                    carrito.splice(i, 1); 
                    break; // Salir del bucle una vez que se elimina
                }
            }
            console.log(carrito);
        }        

        function comprovarCarrito() {
            return carrito.length > 0;
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
            productosFiltrados,
            agregarACesta,
            quitarCesta,
            carrito,
            comprovarCarrito
        };
    },
}).mount("#appVue");
