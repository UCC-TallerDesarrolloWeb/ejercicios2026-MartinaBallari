function convertirUnidades(nombre, valor) {
    let metro, pulgada, pie, yarda;

    // Convertir el valor a número float
    valor = parseFloat(valor);

    // Si no es un número o el campo está vacío, limpiar todos los inputs
    if (isNaN(valor)) {
        document.getElementById("metro").value = "";
        document.getElementById("pulgada").value = "";
        document.getElementById("pie").value = "";
        document.getElementById("yarda").value = "";
        return;
    }

    // Calcular las conversiones según el campo modificado
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

    // Asignar los valores calculados a cada campo de entrada
    document.getElementById("metro").value = Math.round(metro * 100) / 100;
    document.getElementById("pulgada").value = Math.round(pulgada * 100) / 100;
    document.getElementById("pie").value = Math.round(pie * 100) / 100;
    document.getElementById("yarda").value = Math.round(yarda * 100) / 100;
}


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
function convertirUnidades(nombre, valor) {
    let metro, pulgada, pie, yarda;

    // Convertir el valor a número flotante
    valor = parseFloat(valor);

    // Si el valor ingresado no es un número válido, limpia todos los campos
    if (isNaN(valor)) {
        document.getElementById("metro").value = "";
        document.getElementById("pulgada").value = "";
        document.getElementById("pie").value = "";
        document.getElementById("yarda").value = "";
        return;
    }

    // Calcular las conversiones según el campo modificado
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

    // Actualizar los elementos HTML correspondientes
    document.getElementById("metro").value = Math.round(metro * 100) / 100;
    document.getElementById("pulgada").value = Math.round(pulgada * 100) / 100;
    document.getElementById("pie").value = Math.round(pie * 100) / 100;
    document.getElementById("yarda").value = Math.round(yarda * 100) / 100;
}


// EJE DE GRADIANES
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
