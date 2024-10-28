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
        const prendaSeleccionada = ref(null);
        const tallaSeleccionada = ref(null);

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
                filtrarPrendas('');
            }
        }

        function mostrarDiv(id) { return id === divActual.value; }

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
                tallaSeleccionada: tallaSeleccionada.value
            });
        }

        function quitarCesta(prenda) {
            const index = carrito.findIndex(item => item.id_prenda === prenda.id_prenda && item.tallaSeleccionada === prenda.tallaSeleccionada);
            if (index > -1) carrito.splice(index, 1);
        }

        function verInfoPrenda(prenda) {
            // nuevo objeto de prenda sin tallas en stock
            prendaSeleccionada.value = {
                id_prenda: prenda.id_prenda,
                nombre: prenda.nombre,
                descripcion: prenda.descripcion,
                precio: prenda.precio,
                sexo: prenda.sexo,
                imagenes: prenda.imagenes,
                // tallas mayor que 0
                tallas: prenda.tallas.filter(talla => talla.stock > 0)
            };

            // si hay talla, pues assignarla
            if (prendaSeleccionada.value.tallas.length > 0) {
                tallaSeleccionada.value = prendaSeleccionada.value.tallas[0].nombre; 
            } else {
                tallaSeleccionada.value = null;
            }

            canviarDiv('infoPrenda');
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
            carrito,
            verInfoPrenda,
            prendaSeleccionada,
            tallaSeleccionada
        };
    },
}).mount("#appVue");
