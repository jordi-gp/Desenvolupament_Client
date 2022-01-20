window.onload = main;

/*
 *   TODO:
 *   -Editar Begudes
 */

function main() {
    compruebaLog();
    getToken();
    getBebidas();
    document.getElementById("newBebida").addEventListener("click", mostrarFormulario);
}

var token = "";
const apiBebidas = "https://restaurante.serverred.es/api/bebidas";

function getToken() {
    if (JSON.parse(localStorage.getItem("auth-token")) != null) {
        token = JSON.parse(localStorage.getItem("auth-token"));
    }
    return token;
}

function addBebida(element) {
    //Información obtenida del JSON
    var idBebida = element._id;
    var nombreBebida = element.nombre;
    var precioBebida = element.precio;

    //Nodos de texto
    var valBotonBorrar = document.createTextNode("Borrar");
    var valBotonEditar = document.createTextNode("Editar");
    var valIdBebida = document.createTextNode(idBebida);
    var valNombreBebida = document.createTextNode(nombreBebida);
    var valPrecioBebida = document.createTextNode(precioBebida);

    //Botón para borrar la bebida
    var botonBorrar = document.createElement("button");
    botonBorrar.appendChild(valBotonBorrar);
    botonBorrar.setAttribute("class", "btn btn-primary btn-lg borrar");
    botonBorrar.setAttribute("id", idBebida);
    botonBorrar.addEventListener("click", eliminarBebida)

    //Botón para editar la bebida
    var botonEditar = document.createElement("button");
    botonEditar.appendChild(valBotonEditar);
    botonEditar.setAttribute("class", "btn btn-primary btn-lg editar")
    botonEditar.setAttribute("id", idBebida);

    //Elementos del HTML
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    //Añadido de información a las columnas
    td1.appendChild(botonBorrar);
    td2.appendChild(botonEditar);
    td3.appendChild(valNombreBebida);
    td4.appendChild(valPrecioBebida);

    //Añadido de las columnas a las filas
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    //Añadido de la tabla al documento
    var tabla = document.getElementById("files");
    tabla.appendChild(tr);
}

//Mostrado de bebidas
function getBebidas() {
    fetch(apiBebidas, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => data.data.data.forEach(element => {
            addBebida(element);
        }));
}

function mostrarFormulario() {
    var form = document.forms[0];

    for(var i=0; i < form.elements.length; i++) {
        form.elements[i].setAttribute("value", "");
        console.log(form.elements[i].value)
    }

    var formulraio = document.getElementById("formulario");
    formulraio.setAttribute("class", "");

    document.getElementById("confirmar").addEventListener("click", validar, false);
    document.getElementById("cancelar").addEventListener("click", ocultarForm => {
        document.getElementById("formulario").setAttribute("class", "visually-hidden");
    })
}

//Añadido de nuevas bebidas
function nuevaBebida() {
    //Información del formulario
    var nombreBebida = document.getElementById("nombre");
    var precioBebida = document.getElementById("precio");

    //Objeto de tipo bebida
    var bebida = {
        nombre: nombreBebida.value,
        precio: precioBebida.value
    }

    //Petición a la API para añadir una nueva bebida
    fetch(apiBebidas, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token.token
        },
        body: JSON.stringify(bebida)
    })
    .then(response => response.json())
    .then(data => addBebida(data.resultado))
    .catch((error) => {
        console.log("Error => ", error);
    })
    document.getElementById("formulario").setAttribute("class", "visually-hidden");
}

//Eliminación de la bebida seleccionada
function eliminarBebida() {
    id = this.id;
    var url = apiBebidas+"/"+id;

    fetch(url, {
        method: "DELETE",
        headers: {
            "auth-token": token.token
        }
    })
    .catch((error) => {
        console.log("Error => ", error);
    })

    var bebidaBorrada = document.getElementById(id);
    bebidaBorrada.parentNode.parentNode.parentNode.removeChild(bebidaBorrada.parentNode.parentNode);
}

//Validaciones del formulario
function validaNombreBebida() {
    var nombreBebida = document.getElementById("nombre");

    if(!nombreBebida.checkValidity()) {
        if(nombreBebida.validity.valueMissing) {
            error2(nombreBebida, "Se ha de proporcionar el nombre de la bebida");
        } else if(nombreBebida.validity.patternMismatch) {
            error2(nombreBebida, "El nombre introducido no es vàlido");
        }
        return false;
    }
    return true;
}

function validaPrecioBebida() {
    var precioBebida = document.getElementById("precio");

    if(!precioBebida.checkValidity()) {
        if(precioBebida.validity.valueMissing) {
            error2(precioBebida, "Se ha de proporcionar un precio para la bebida");
        } else if(precioBebida.validity.patternMismatch) {
            error2(precioBebida, "El precio introducido no es correcto");
        } else if(precioBebida.validity.rangeUnderflow) {
            error2(precioBebida, "El precio de la bebida no puede ser inferior a 0");
        }
        return false;
    }
    return true;
}

//Apartado de formulario
//TODO: validar el formulario
function validar(e) {
    e.preventDefault();
    borrarErrores();

    var id = document.getElementById("_id").value;

    if(validaNombreBebida() && validaPrecioBebida()) {
        if(id == "") {
            nuevaBebida();
        } else {
            console.log("edicio de beguda");
        }
    }
}

function error2(element, missatge) {
    var msgError = document.createTextNode(missatge);
    var error = document.getElementById("missatgeError");

    error.replaceChildren(msgError);
    element.focus();
}

function borrarErrores() {
    var formulario = document.forms[0];

    var msgError = document.createTextNode("");
    var error = document.getElementById("missatgeError");

    error.replaceChildren(msgError);
}
