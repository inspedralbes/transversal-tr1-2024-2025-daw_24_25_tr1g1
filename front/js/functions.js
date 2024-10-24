import { createApp, ref, reactive, computed, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ data: { categorias: [] } });
        const infoTotal = reactive({ data: { categorias: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const divActual = ref('portada');
        const dropdownVisible = ref(false);
        const filtroSexo = ref(null);
        const prendaFiltrados = ref([]);
        const carrito = reactive([]);
        const currentPage = ref(0);
        const prendaAleatorios = ref([]);  // Nueva propiedad para prenda aleatorios


        onBeforeMount(async () => {
            const data = await getProductes();
            console.log(data.producto);
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.prendas = []; // Inicializar el array de prendas
            data.categorias.forEach(categoria => {
                infoTotal.data.prendas.push(...categoria.prendas); // Agregar las prendas de cada categoría
            });

            console.log(infoTotal.data.prendas);
            console.log(infoTotal.data.categorias);
            getProductoAleatorios();
        });

        // Función para obtener productos aleatorios
        function getProductoAleatorios() {
            const allProducts = infoTotal.data.prendas; // Todos los productos
            if (!allProducts || allProducts.length === 0) {
                console.error("No hay prendas disponibles.");
                return;
            }

            // Barajar las prendas
            const shuffled = allProducts.sort(() => 0.5 - Math.random());
            // Seleccionar los primeros 6 prendas aleatorios
            prendaAleatorios.value = shuffled.slice(0, 6);
            console.log("Prendas aleatorias seleccionadas:", prendaAleatorios.value); // Verifica lo que se seleccionó
        }


        const categoriaActual = computed(() => {
            return infoTotal.data.categorias[currentPage.value] || null;
        });





        function filtrarPrendas(sexo) {
            divActual.value = 'prendas';
            activeIndex.value = 0;
            mostrar.value = true;
            filtroSexo.value = sexo;
            prendaFiltrados.value = infoTotal.data.prenda.filter(producto => producto.sexo === sexo);
            console.log(prendaFiltrados.value);
        }


        function mostrarCategorias(index) {
            if (index >= 0 && index < infoTotal.data.categorias.length) {
                activeIndex.value = index;
                mostrar.value = true;
                divActual.value = 'prendas';
                prendaFiltrados.value = infoTotal.data.categorias[index].prendas;
                console.log(prendaFiltrados.value);
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
                if (carrito[i] === prenda) {
                    carrito.splice(i, 1); 
                }
            }
            console.log(carrito);
        }        

        return {
            infoTotal,
            categoriaActual,
            prendaAleatorios,
            getProductoAleatorios,
           
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
