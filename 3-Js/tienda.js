
// ==========================================
// LISTA DE PRODUCTOS
// ==========================================

// Guardamos los datos de los productos en una lista de objetos
const productos = [
    {
        nombre: "Dobok",
        precio: 25000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/dobok.webp",
        descripcion: "Uniforme oficial para la práctica de Taekwondo."
    },
    {
        nombre: "Cabezal Cerrado",
        precio: 18000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/cabezal-cerrado.webp",
        descripcion: "Protector de cabeza para mayor seguridad."
    },
    {
        nombre: "Escudo de Potencia",
        precio: 22000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/escudo-potencia.webp",
        descripcion: "Escudo acolchado para entrenamiento de patadas."
    },
    {
        nombre: "Foco con Dedos",
        precio: 12000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/foco-con-dedos.webp",
        descripcion: "Manopla para entrenamiento de precisión."
    },
    {
        nombre: "Guantes 10 Onzas",
        precio: 15000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/protectores-manos.webp",
        descripcion: "Guantes de protección para manos."
    },
    {
        nombre: "Protectores Pie",
        precio: 14000,
        imagen: "https://ucc-tallerdesarrolloweb.github.io/filminas/images/ejercicios/protectores-pie.webp",
        descripcion: "Protectores acolchados para pies."
    }
];


// ==========================================
// 1. CARGAR PRODUCTOS EN EL CATÁLOGO
// ==========================================

const cargarProductos = () => {
    let contenedor = document.getElementById("contenedorProductos");
    
    // Si estamos en carrito.html, cargamos el carrito y cortamos la función
    if (!contenedor) {
        cargarCarrito();
        return;
    }

    let textoHTML = "";

    // Recorremos la lista de productos uno por uno
    for (let i = 0; i < productos.length; i++) {
        textoHTML += `
            <div>
                <img src="${productos[i].imagen}" alt="${productos[i].nombre}">
                <h3>${productos[i].nombre}</h3>
                <p><strong>Precio:</strong> $${productos[i].precio}</p>
                <button onclick="abrirDialog(${i})">Ver detalle</button>
                <button onclick="agregarAlCarrito(${i})">Agregar al carrito</button>
            </div>
        `;
    }

    // Inyectamos todo el HTML dentro del main
    contenedor.innerHTML = textoHTML;
};


// ==========================================
// 2. VENTANA MODAL (DIALOG)
// ==========================================

const abrirDialog = (posicion) => {
    let dialog = document.getElementById("dialogDetalle");
    let contenido = document.getElementById("contenidoDialog");
    let prod = productos[posicion];

    contenido.innerHTML = `
        <h2>${prod.nombre}</h2>
        <img src="${prod.imagen}" alt="${prod.nombre}" style="width: 150px;">
        <p><strong>Precio:</strong> $${prod.precio}</p>
        <p>${prod.descripcion}</p>
    `;

    dialog.showModal();
};

const cerrarDialog = () => {
    let dialog = document.getElementById("dialogDetalle");
    dialog.close();
};


// ==========================================
// 3. CARRITO Y LOCALSTORAGE 
// ==========================================

// Agregar un producto guardándolo en el navegador
const agregarAlCarrito = (posicion) => {
    let prod = productos[posicion];

    // Leemos lo que hay guardado en el navegador
    let carritoGuardado = localStorage.getItem("carrito");
    let carrito = [];

    // Si ya había cosas guardadas, las convertimos de texto a objeto
    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    // Guardamos el nuevo producto en la lista
    carrito.push(prod);

    // Lo volvemos a guardar en el navegador convertido en texto
    localStorage.setItem("carrito", JSON.stringify(carrito));

    alert("Producto agregado al carrito");
};

// Mostrar los productos guardados en carrito.html
const cargarCarrito = () => {
    let contenedor = document.getElementById("contenedorCarrito");
    if (!contenedor) return;

    let carritoGuardado = localStorage.getItem("carrito");
    let carrito = [];

    if (carritoGuardado !== null) {
        carrito = JSON.parse(carritoGuardado);
    }

    // Si no hay productos guardados
    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let textoHTML = "";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
        textoHTML += `
            <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; border-radius: 8px;">
                <img src="${carrito[i].imagen}" alt="${carrito[i].nombre}" style="width: 80px;">
                <h3>${carrito[i].nombre}</h3>
                <p>Precio: $${carrito[i].precio}</p>
            </div>
        `;
    }

    textoHTML += `<h3>Total: $${total}</h3>`;
    textoHTML += `<button onclick="vaciarCarrito()">Vaciar Carrito</button>`;

    contenedor.innerHTML = textoHTML;
};

// Limpiar la memoria del navegador
const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    cargarCarrito();
};

// Ejecutar la función automáticamente al cargar la página
window.onload = cargarProductos;