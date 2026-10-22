
 // ==========================================
 // LISTA DE PRODUCTOS
 // ==========================================

 const productos = [
    {
        nombre: "Dobok",
        precio: 25000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/dobok.webp",
        descripcion: "Uniforme oficial para la práctica de Taekwondo.",
        marca: "Adidas",
        categoria: "doboks"
    },
    {
        nombre: "Cabezal Cerrado",
        precio: 18000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/cabezal-cerrado.webp",
        descripcion: "Protector de cabeza para mayor seguridad.",
        marca: "Daedo",
        categoria: "protectores"
    },
    {
        nombre: "Escudo de Potencia",
        precio: 22000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/escudo-potencia.webp",
        descripcion: "Escudo acolchado para entrenamiento de patadas.",
        marca: "Kwon",
        categoria: "entrenamiento"
    },
    {
        nombre: "Foco con Dedos",
        precio: 12000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/foco-con-dedos.webp",
        descripcion: "Manopla para entrenamiento de precisión.",
        marca: "Kwon",
        categoria: "entrenamiento"
    },
    {
        nombre: "Guantes 10 Onzas",
        precio: 15000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/protectores-manos.webp",
        descripcion: "Guantes de protección para manos.",
        marca: "Daedo",
        categoria: "protectores"
    },
    {
        nombre: "Protectores Pie",
        precio: 14000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/protectores-pie.webp",
        descripcion: "Protectores acolchados para pies.",
        marca: "Adidas",
        categoria: "protectores"
    }
];


// ==========================================
// 1. FORMATEAR PRECIOS
// ==========================================

const formatearPrecio = (precio) => {
    return precio.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};


// ==========================================
// 2. CARGAR PRODUCTOS EN EL CATÁLOGO
// ==========================================

const cargarProductos = () => {
    let contenedor = document.getElementById("contenedorProductos");

    if (!contenedor) {
        cargarCarrito();
        actualizarContador();
        return;
    }

    // Conectamos los filtros y el ordenamiento
    document.getElementById("buscar").oninput = filtrarProductos;
    document.getElementById("minimo").oninput = filtrarProductos;
    document.getElementById("maximo").oninput = filtrarProductos;
    document.getElementById("marca").onchange = filtrarProductos;
    document.getElementById("ordenar").onchange = filtrarProductos;

    let categorias = document.querySelectorAll('input[name="tipo"]');

    for (let i = 0; i < categorias.length; i++) {
        categorias[i].onchange = filtrarProductos;
    }

    filtrarProductos();
    actualizarContador();
};


// ==========================================
// 3. FILTRAR Y ORDENAR PRODUCTOS
// ==========================================

const filtrarProductos = () => {
    let contenedor = document.getElementById("contenedorProductos");

    if (!contenedor) return;

    let palabra = document.getElementById("buscar").value.toLowerCase();
    let minimo = document.getElementById("minimo").value;
    let maximo = document.getElementById("maximo").value;
    let marca = document.getElementById("marca").value;
    let orden = document.getElementById("ordenar").value;

    let categorias = document.querySelectorAll('input[name="tipo"]:checked');
    let categoriasSeleccionadas = [];

    for (let i = 0; i < categorias.length; i++) {
        categoriasSeleccionadas.push(categorias[i].value);
    }

    let listaFiltrada = [];

    for (let i = 0; i < productos.length; i++) {
        let prod = productos[i];

        let coincidePalabra =
            prod.nombre.toLowerCase().includes(palabra) ||
            prod.descripcion.toLowerCase().includes(palabra);

        let coincideMinimo =
            minimo === "" || prod.precio >= Number(minimo);

        let coincideMaximo =
            maximo === "" || prod.precio <= Number(maximo);

        let coincideMarca =
            marca === "" || prod.marca === marca;

        let coincideCategoria =
            categoriasSeleccionadas.length === 0 ||
            categoriasSeleccionadas.includes(prod.categoria);

        if (
            coincidePalabra &&
            coincideMinimo &&
            coincideMaximo &&
            coincideMarca &&
            coincideCategoria
        ) {
            listaFiltrada.push(prod);
        }
    }

    // Ordenar por precio o por nombre
    if (orden === "precioAsc") {
        listaFiltrada.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precioDesc") {
        listaFiltrada.sort((a, b) => b.precio - a.precio);
    } else if (orden === "nombreAsc") {
        listaFiltrada.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    } else if (orden === "nombreDesc") {
        listaFiltrada.sort((a, b) => b.nombre.localeCompare(a.nombre, "es"));
    }

    // Mostrar los productos que cumplen los filtros
    let textoHTML = "";

    for (let i = 0; i < listaFiltrada.length; i++) {
        let prod = listaFiltrada[i];
        let posicion = productos.indexOf(prod);

        textoHTML += `
            <div>
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p><strong>Precio:</strong> ${formatearPrecio(prod.precio)}</p>
                <p><strong>Marca:</strong> ${prod.marca}</p>
                <p><strong>Categoría:</strong> ${prod.categoria}</p>
                <button onclick="abrirDialog(${posicion})">Ver detalle</button>
                <button onclick="agregarAlCarrito(${posicion})">Agregar al carrito</button>
            </div>
        `;
    }

    if (listaFiltrada.length === 0) {
        textoHTML = "<p>No se encontraron productos.</p>";
    }

    contenedor.innerHTML = textoHTML;
};


// ==========================================
// 4. VENTANA MODAL
// ==========================================

const abrirDialog = (posicion) => {
    let dialog = document.getElementById("dialogDetalle");
    let contenido = document.getElementById("contenidoDialog");
    let prod = productos[posicion];

    contenido.innerHTML = `
        <h2>${prod.nombre}</h2>
        <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 150px;">
        <p><strong>Precio:</strong> ${formatearPrecio(prod.precio)}</p>
        <p><strong>Marca:</strong> ${prod.marca}</p>
        <p><strong>Categoría:</strong> ${prod.categoria}</p>
        <p>${prod.descripcion}</p>
    `;

    dialog.showModal();
};

const cerrarDialog = () => {
    let dialog = document.getElementById("dialogDetalle");
    dialog.close();
};


// ==========================================
// 5. AGREGAR PRODUCTOS AL CARRITO
// ==========================================

const agregarAlCarrito = (posicion) => {
    let prod = productos[posicion];

    let carritoGuardado = localStorage.getItem("carrito");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    // Si el producto ya existe, aumentamos su cantidad
    let encontrado = false;

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === prod.nombre) {
            carrito[i].cantidad = (carrito[i].cantidad || 1) + 1;
            encontrado = true;
        }
    }

    // Si no existe, lo agregamos con cantidad 1
    if (!encontrado) {
        let nuevoProducto = { ...prod, cantidad: 1 };
        carrito.push(nuevoProducto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();

    alert("Producto agregado al carrito");
};


// ==========================================
// 6. MOSTRAR EL CARRITO
// ==========================================

const cargarCarrito = () => {
    let contenedor = document.getElementById("contenedorCarrito");

    if (!contenedor) return;

    let carritoGuardado = localStorage.getItem("carrito");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        actualizarContador();
        return;
    }

    let textoHTML = "";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        // Compatibilidad con productos guardados anteriormente
        if (!carrito[i].cantidad) {
            carrito[i].cantidad = 1;
        }

        let subtotal = carrito[i].precio * carrito[i].cantidad;
        total += subtotal;

        textoHTML += `
            <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 8px;">
                <img src="${carrito[i].imagen}" alt="${carrito[i].nombre}" style="width: 80px;">
                <h3>${carrito[i].nombre}</h3>
                <p>Precio unitario: ${formatearPrecio(carrito[i].precio)}</p>
                <p>Cantidad: ${carrito[i].cantidad}</p>
                <p>Subtotal: ${formatearPrecio(subtotal)}</p>
                <button onclick="eliminarProducto(${i})">Eliminar producto</button>
            </div>
        `;
    }

    textoHTML += `<h3>Total a pagar: ${formatearPrecio(total)}</h3>`;
    textoHTML += `<button onclick="vaciarCarrito()">Vaciar Carrito</button>`;

    contenedor.innerHTML = textoHTML;

    // Guardamos las cantidades normalizadas
    localStorage.setItem("carrito", JSON.stringify(carrito));

    actualizarContador();
};


// ==========================================
// 7. ELIMINAR UN PRODUCTO
// ==========================================

const eliminarProducto = (posicion) => {
    let carritoGuardado = localStorage.getItem("carrito");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    carrito.splice(posicion, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    cargarCarrito();
    actualizarContador();
};


// ==========================================
// 8. VACIAR EL CARRITO
// ==========================================

const vaciarCarrito = () => {
    localStorage.removeItem("carrito");

    cargarCarrito();
    actualizarContador();
};


// ==========================================
// 9. CONTADOR DEL CARRITO
// ==========================================

const actualizarContador = () => {
    let contador = document.getElementById("contadorCarrito");

    if (!contador) return;

    let carritoGuardado = localStorage.getItem("carrito");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    let cantidadTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        cantidadTotal += carrito[i].cantidad || 1;
    }

    contador.textContent = cantidadTotal;
};


// ==========================================
// EJECUTAR AL CARGAR LA PÁGINA
// ==========================================

window.onload = cargarProductos;
