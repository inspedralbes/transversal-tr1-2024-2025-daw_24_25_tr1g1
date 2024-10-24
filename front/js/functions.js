import { createApp, ref, reactive, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ data: { categorias: [], productos: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const divActual = ref('portada');   
        const productosFiltrados = ref([]); 
        const carrito = reactive([]); 

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos; 
            console.log(infoTotal.data.categorias);
            console.log(infoTotal.data.productos); 
        });
        
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

        function agregarACesta(prenda) {
            carrito.push(prenda); 
            console.log("Producto añadido al carrito:", prenda);
            console.log("Estado actual del carrito:", carrito); 
        }
        
        function quitarCesta(prenda) {
            const index = carrito.findIndex(item => item.id === prenda.id); 
            if (index !== -1) {
                carrito.splice(index, 1); 
                console.log("Producto eliminado del carrito:", prenda);
            } else {
                console.log("Producto no encontrado en el carrito:", prenda);
            }
            console.log("Estado actual del carrito:", carrito);
        }        

        function comprovarCarrito() {
            divActual.value = 'carritoLateral';
            mostrar.value = true;
            return carrito.length > 0;
        }

        return {
            infoTotal,
            mostrarCategorias,
            canviarDiv,
            mostrarDiv,
            mostrar,
            activeIndex,
            productosFiltrados,
            agregarACesta,
            quitarCesta,
            carrito,
            comprovarCarrito
        };
    },
}).mount("#appVue");
