import { createApp, ref, reactive, onBeforeMount } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import { getProductes } from './comunicationManager.js';

createApp({
    setup() {
        const infoTotal = reactive({ data: { categorias: [], productos: [] } });
        const mostrar = ref(false); // Controla la visibilidad de navCat
        const activeIndex = ref(0);
        const filtroSexo = ref(null);
        const carrito = reactive([]);
        const divActual = ref('portada');
        const dropdownVisible = ref(false);
        const productosFiltrados = ref([]);
        const tallaSeleccionada = ref(null);
        const prendaSeleccionada = ref(null);
<<<<<<< HEAD
        const correoElectronico = ref('');

=======
        const usuario = ref('');
        const contrasena = ref('');
        const errorLogin = ref('');
        const menuVisible = ref(false); 
>>>>>>> da2fe0916ae38beac52f62fd02f7eddbe61b1434

        const menuState = reactive({
            mostrar: false,
            mostrarBotonCerrar: false
        });

        onBeforeMount(async () => {
            const data = await getProductes();
            infoTotal.data.categorias = data.categorias;
            infoTotal.data.productos = data.productos;
<<<<<<< HEAD
            getProductoAleatorios();
        });

        function getProductoAleatorios() {
            const allProducts = infoTotal.data.categorias.flatMap(categoria => categoria.prendas);
            prendaAleatorios.value = allProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
        }
=======
        });      
>>>>>>> da2fe0916ae38beac52f62fd02f7eddbe61b1434

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
                divActual.value = 'prendas';
                productosFiltrados.value = infoTotal.data.categorias[index].prendas;
            }
        }

        function mostrarDiv(id) {
            return id === divActual.value;
        }

        function canviarDiv(nouDiv) {
            divActual.value = nouDiv;
<<<<<<< HEAD
            mostrar.value = false; 
        }


=======
            mostrar.value = false;
            menuVisible.value = false; 
            console.log("Div actual cambiado a:", divActual.value);
        }
>>>>>>> da2fe0916ae38beac52f62fd02f7eddbe61b1434

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
<<<<<<< HEAD
=======

        function toggleMenuLateral() {
            menuVisible.value = !menuVisible.value; 
        }
        
        
>>>>>>> da2fe0916ae38beac52f62fd02f7eddbe61b1434

        function verInfoPrenda(prenda) {
            if (prenda) {
                prendaSeleccionada.value = prenda;
                tallaSeleccionada.value = prenda.tallas?.length ? prenda.tallas[0].nombre : null;
                canviarDiv('infoPrenda');
            }
        }

        function iniciarSesion() {
            if (usuario.value === '' && contrasena.value === '') {
                errorLogin.value = '';
                canviarDiv('portada');
            } else {
                errorLogin.value = 'Credenciales incorrectas';
            }
        }

        function finalizarCompra() {
            const datosCompra = carrito.map(item => ({
                id_prenda: item.id_prenda,
                talla: item.talla.nombre
            }));
            console.log(datosCompra);

            fetch('TU_URL_DE_API/aqui', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosCompra),
            })
            .then(response => {
                if (!response.ok) {
                    console.log('Error en la compra');
                }
                return response.json();
            })
            .then(data => {
                console.log('Compra finalizada', data);
            })
<<<<<<< HEAD
            .catch(error => {
                console.error('Error al finalizar la compra:', error);
            });
=======
            .catch(error => console.error('Error:', error));
>>>>>>> da2fe0916ae38beac52f62fd02f7eddbe61b1434
        }

        function signOut() {
            // Lógica para cerrar sesión
            console.log("Sesión cerrada");
            usuario.value = '';
            contrasena.value = '';
            canviarDiv('portada');
        }


        

        return {
<<<<<<< HEAD
            infoTotal, mostrarCategorias, canviarDiv, mostrarDiv, mostrar,
            activeIndex, dropdownVisible, filtroSexo, filtrarPrendas, productosFiltrados, 
            agregarACesta, quitarCesta, carrito, getProductoAleatorios, prendaAleatorios, 
            verInfoPrenda, prendaSeleccionada, tallaSeleccionada, seleccionarTalla, finalizarCompra
=======
            infoTotal,
            mostrar,
            activeIndex,
            filtroSexo,
            carrito,
            divActual,
            dropdownVisible,
            productosFiltrados,
            tallaSeleccionada,
            prendaSeleccionada,
            usuario,
            contrasena,
            errorLogin,
            menuVisible, // Exponer la propiedad del menú
            filtrarPrendas,
            mostrarCategorias,
            mostrarDiv,
            canviarDiv,
            seleccionarTalla,
            agregarACesta,
            quitarCesta,
            toggleMenuLateral, // Exponer la función de toggle
            verInfoPrenda,
            iniciarSesion,
            finalizarCompra,
            signOut // Exponer la función de cerrar sesión
>>>>>>> da2fe0916ae38beac52f62fd02f7eddbe61b1434
        };
    }
}).mount('#appVue');
