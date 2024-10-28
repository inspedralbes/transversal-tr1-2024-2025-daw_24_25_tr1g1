import { createApp, ref, reactive, computed, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        // Declaración de variables reactivas
        const infoTotal = reactive({ data: { categorias: [], productos: [] } });
        const mostrar = ref(false);
        const activeIndex = ref(0);
        const divActual = ref('portada');
        const dropdownVisible = ref(false);
        const filtroSexo = ref(null);
        const productosFiltrados = ref([]);
        const carrito = reactive([]);
        const prendaAleatorios = ref([]);
        const prendaSeleccionada = ref(null);
        const tallaSeleccionada = ref(null);

        // Cargar datos iniciales
        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos;
            getProductoAleatorios();
        });

        // Generar productos aleatorios para la portada
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

        // Mostrar categorías y filtrar productos por categoría
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

    function agregarACesta(prenda) {
        carrito.push({
            id_prenda: prenda.id_prenda,
            nombre: prenda.nombre,
            precio: prenda.precio,
            imagenes: prenda.imagenes,
            talla: tallaSeleccionada.value,
        });
    }


        // Quitar prenda del carrito
        function quitarCesta(prenda) {
            const index = carrito.findIndex(item => item.id_prenda === prenda.id_prenda && item.tallaSeleccionada === prenda.tallaSeleccionada);
            if (index > -1) carrito.splice(index, 1);
        }

        function verInfoPrenda(prenda) {
            if (prenda) {
                prendaSeleccionada.value = prenda;
                tallaSeleccionada.value = prenda.tallas?.length ? prenda.tallas[0].nombre : null;
                canviarDiv('infoPrenda');
            } else {
                console.error("No se ha seleccionado una prenda.");
            }
        }
        


        return {
            infoTotal,mostrarCategorias,canviarDiv,mostrarDiv,mostrar,activeIndex,dropdownVisible,
            filtroSexo,filtrarPrendas,productosFiltrados,agregarACesta,quitarCesta,carrito,
            getProductoAleatorios,prendaAleatorios,verInfoPrenda,prendaSeleccionada,tallaSeleccionada,
        };
    },
}).mount("#appVue");