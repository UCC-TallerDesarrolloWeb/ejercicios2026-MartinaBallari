// DOCUMENTACION
/**
 * Realiza la conversión de unidades de longitud (metros, pulgadas, pies y yardas)
 * según el campo que haya sido modificado por el usuario en el formulario.
 * 
 * @function convertirUnidades
 * @param {string} nombre - Nombre del campo de entrada que disparó el evento (ej. "unid_metro", "unid_pulgada").
 * @param {string|number} valor - Valor numérico ingresado por el usuario en el campo de texto.
 * @returns {void} No retorna ningún valor; actualiza directamente los valores en el DOM.
 */
const convertirUnidades = (nombre, valor) => {
    let metro, pulgada, pie, yarda;

    // Asegurar que el valor ingresado se trate como texto
    valor = String(valor);

    // Reemplazar comas por puntos en caso de decimales tipeados con coma
    if (valor.includes(",")) {
        valor = valor.replace(",", ".");
    }

    // Convertir a número flotante
    valor = parseFloat(valor);

    // Validar si no es un número o si la casilla está vacía
    if (isNaN(valor)) {
        alert("El valor ingresado es incorrecto");
        metro = "";
        pulgada = "";
        pie = "";
        yarda = "";
    } else {
        // Realizar los cálculos según qué campo cambió
        switch (nombre) {
            case "unid_metro":
                metro = valor;
                pulgada = valor * 39.3701;
                pie = valor * 3.28084;
                yarda = valor * 1.09361;
                break;
            case "unid_pulgada":
                metro = valor / 39.3701;
                pulgada = valor;
                pie = valor / 12;
                yarda = valor / 36;
                break;
            case "unid_pie":
                metro = valor / 3.28084;
                pulgada = valor * 12;
                pie = valor;
                yarda = valor / 3;
                break;
            case "unid_yarda":
                metro = valor / 1.09361;
                pulgada = valor * 36;
                pie = valor * 3;
                yarda = valor;
                break;
        }
    }

    // Asignación de valores a la interfaz de usuario
    if (metro === "") {
        document.getElementById("metro").value = "";
        document.getElementById("pulgada").value = "";
        document.getElementById("pie").value = "";
        document.getElementById("yarda").value = "";
    } else {
        document.getElementById("metro").value = Math.round(metro * 100) / 100;
        document.getElementById("pulgada").value = Math.round(pulgada * 100) / 100;
        document.getElementById("pie").value = Math.round(pie * 100) / 100;
        document.getElementById("yarda").value = Math.round(yarda * 100) / 100;
    }
};

// EJE DE GRADOS Y RADIANES
/**
 * Convierte valores de Grados a Radianes y viceversa usando Math.PI
 * @param {string} id - Identificador del input modificado ("grados" o "radianes")
 * @param {string|number} valor - Valor numérico ingresado por el usuario
 */
function convertirGR(id, valor) {
    let grados, radianes;

    valor = parseFloat(valor);

    // Si no es un número válido, limpia ambos campos
    if (isNaN(valor)) {
        document.getElementById("grados").value = "";
        document.getElementById("radianes").value = "";
        return;
    }

    if (id === "grados") {
        grados = valor;
        radianes = (valor * Math.PI) / 180;
    } else if (id === "radianes") {
        radianes = valor;
        grados = (valor * 180) / Math.PI;
    }

    document.getElementById("grados").value = grados;
    document.getElementById("radianes").value = radianes;
}

// MOSTRAR Y OCULTAR FUNCION
function mostrarOcultar(valor) {
    const div = document.getElementById("unDiv");

    if (valor === "val_mostrar") {
        div.style.display = "block";
    } else if (valor === "val_ocultar") {
        div.style.display = "none";
    }
} 

// OPERACIONES MATEMÁTICAS II (uso de innerHTML)

// Sumar
const sumar = () => {
    let num1 = document.getElementById("nums1").value;
    let num2 = document.getElementById("nums2").value;

    if (num1 !== "" && num2 !== "") {
        let res = Number(num1.replace(",", ".")) + Number(num2.replace(",", "."));
        if (!isNaN(res)) {
            document.getElementById("totalS").innerHTML = res;
        } else {
            alert("Ingrese valores numéricos válidos");
            document.getElementById("totalS").innerHTML = "";
        }
    }
};

// Restar
const restar = () => {
    let num1 = document.getElementById("numr1").value;
    let num2 = document.getElementById("numr2").value;

    if (num1 !== "" && num2 !== "") {
        let res = Number(num1.replace(",", ".")) - Number(num2.replace(",", "."));
        if (!isNaN(res)) {
            document.getElementById("totalR").innerHTML = res;
        } else {
            alert("Ingrese valores numéricos válidos");
            document.getElementById("totalR").innerHTML = "";
        }
    }
};

// Multiplicar
const multiplicar = () => {
    let num1 = document.getElementById("numm1").value;
    let num2 = document.getElementById("numm2").value;

    if (num1 !== "" && num2 !== "") {
        let res = Number(num1.replace(",", ".")) * Number(num2.replace(",", "."));
        if (!isNaN(res)) {
            document.getElementById("totalM").innerHTML = res;
        } else {
            alert("Ingrese valores numéricos válidos");
            document.getElementById("totalM").innerHTML = "";
        }
    }
};

// Dividir
const dividir = () => {
    let num1 = document.getElementById("numd1").value;
    let num2 = document.getElementById("numd2").value;

    if (num1 !== "" && num2 !== "") {
        let val2 = Number(num2.replace(",", "."));
        if (val2 === 0) {
            alert("No se puede dividir por cero");
            document.getElementById("totalD").innerHTML = "";
            return;
        }

        let res = Number(num1.replace(",", ".")) / val2;
        if (!isNaN(res)) {
            document.getElementById("totalD").innerHTML = res;
        } else {
            alert("Ingrese valores numéricos válidos");
            document.getElementById("totalD").innerHTML = "";
        }
    }
};

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