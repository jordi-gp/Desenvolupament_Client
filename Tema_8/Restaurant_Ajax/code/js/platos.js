window.onload = main;

/**
 * TODO:
 * -Mostrar Platos
 * -Añadir Platos
 * -Borrar Platos
 * -Editar Platos
*/

function main() {
    compruebaLog();
    getToken();
    getPlatos();
    document.getElementById("newPlato").addEventListener("click", mostrarFormulario);
}

var token = "";
const apiPlatos = "https://restaurante.serverred.es/api/platos";

function getToken() {
    if(JSON.parse(localStorage.getItem("auth-token")) != null) {
        token = JSON.parse(localStorage.getItem("auth-token"));
    }
    return token;
}

//Función para añadir un nuevo plato a la lista
function addPlato(element) {
    var idPlato = element._id;
    var nombrePlato = element.nombre;
    var ordenPlato = element.orden;
    var precioPlato = element.precio;

    //Nodos de texto
    var valBotonBorrar = document.createTextNode("Borrar");
    var valBotonEditar = document.createTextNode("Editar");
    var valNombrePlato = document.createTextNode(nombrePlato);
    var valOrdenPlato = document.createTextNode(ordenPlato);
    var valPrecioPlato = document.createTextNode(precioPlato);

    //Botón para borrar el plato seleccionado
    var botonBorrar = document.createElement("button");
    botonBorrar.appendChild(valBotonBorrar);
    botonBorrar.setAttribute("class", "btn btn-primary btn-lg borrar");
    botonBorrar.setAttribute("id", idPlato);
    botonBorrar.addEventListener("click", eliminarPlato);

    //Botón para editar el plato seleccionado
    var botonEditar = document.createElement("button");
    botonEditar.appendChild(valBotonEditar);
    botonEditar.setAttribute("class", "btn btn-primary btn-lg editar");
    botonEditar.setAttribute("id", idPlato);
    botonEditar.addEventListener("click", editarPlato);

    //Elementos del HTMl
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    //Añadido de información a las columnas
    td1.appendChild(botonBorrar);
    td2.appendChild(botonEditar);
    td3.appendChild(valNombrePlato);
    td4.appendChild(valOrdenPlato);
    td5.appendChild(valPrecioPlato);

    //Añadido de las columnas a las filas
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    //Añadido de la tabla al documento
    var tabla = document.getElementById("files");
    tabla.appendChild(tr);
}

//Mostrado de platos
function getPlatos() {
    fetch(apiPlatos, {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            "auth-token": token.token
        }
    })
    .then(response => response.json())
    .then(data => data.data.data.forEach(element => {
        addPlato(element);
    }));
}

function mostrarFormulario() {
    //TODO: Solucionar esta porqueria
    var form = document.forms[0];

    for(var i=0; i < form.elements.length; i++) {
        form.elements[i].setAttribute("value", "");
    }

    document.getElementById("formulario").setAttribute("class", "");

    document.getElementById("confirmar").addEventListener("click", validar, false);
    document.getElementById("cancelar").addEventListener("click", ocultarForm => {
        document.getElementById("formulario").setAttribute("class", "visually-hidden");
    })
}

//Funciones de la pàgina
//Función para añadir un nuevo plato
function nuevoPlato() {
    //Información del formulario
    var nombrePlato = document.getElementById("nombre");
    var ordenPlato = document.getElementById("orden");
    var precioPlato = document.getElementById("precio");

    //Objte de tipo plato
    var plato = {
        nombre: nombrePlato.value,
        orden: ordenPlato.value,
        precio: precioPlato.value
    }

    //Petición a la API para añadir un nuevo plato
    fetch(apiPlatos, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token.token
        },
        body: JSON.stringify(plato)
    })
    .then(response => response.json())
    .then(data => addPlato(data.resultado))
    .catch((error) => {
        console.log("Error => ", error);
    })
    document.getElementById("formulario").setAttribute("class", "visually-hidden");
}

//Función para editar el plato seleccionado
function editarPlato() {
    mostrarFormulario();
    
    var lista = this.parentNode.parentNode.childNodes;

    //Información del formulario
    var idMesa = document.getElementById("_id");
    var nombrePlato = document.getElementById("nombre");
    var ordenPlato = document.getElementById("orden");
    var precioPlato = document.getElementById("precio");


    idMesa.setAttribute("value", this.id);
    nombrePlato.setAttribute("value", lista[2].innerText);
    ordenPlato.setAttribute("value", lista[3].innerText);
    precioPlato.setAttribute("value", lista[4].innerText);

    //Objeto de tipo plato actualizado
    var platoAct = {
        nombre: nombrePlato.value,
        orden: ordenPlato.value,
        precio: precioPlato.value
    }

    var url = apiPlatos+"/"+idMesa.value;
    console.log(url);

    // fetch(url, {
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "auth-token": token.token
    //     },
    //     body: JSON.stringify(platoAct)
    // })
    // .then(response => response.json())
    // .then(cambiar => {
    //     lista[2].replaceChildren(nombrePlato.value);
    //     lista[3].replaceChildren(ordenPlato.value);
    //     lista[4].replaceChildren(precioPlato.value);
    //     document.getElementById("formulario").setAttribute("class", "visually-hidden");
    // })
    // .catch((error) => {
    //     console.log("Error => ", error);
    // })
}

//Función para eliminar el plato seleccionado
function eliminarPlato() {
    id = this.id;
    var url = apiPlatos+"/"+id;

    fetch(url, {
        method: "DELETE",
        headers: {
            "auth-token": token.token
        }
    })
    .catch((error) => {
        console.log("Error => ", error);
    })

    var platoBorrado = document.getElementById(id);
    platoBorrado.parentNode.parentNode.parentNode.removeChild(platoBorrado.parentNode.parentNode);
}

//Validación de los campos del formulario
function validaNombrePlato() {
    var nombrePlato = document.getElementById("nombre");

    if(!nombrePlato.checkValidity()) {
        if(nombrePlato.validity.valueMissing) {
            error2(nombrePlato, "Se ha de indicar un nombre para el plato");
        } else if(nombrePlato.validity.patternMismatch) {
            error2(nombrePlato, "El nombre introducido para el plato no es correcto");
        }
        return false;
    }
    return true;
}

function validaOrdenPlato() {
    var orden = document.getElementById("orden");
    if(orden.value == "Selecciona Orden") {
        error2(orden, "Se ha de seleccionar el orden del plato");
    } else {
        return true;
    }
}

function validaPrecioPlato() {
    var precioPlato = document.getElementById("precio");

    if(!precioPlato.checkValidity()) {
        if(precioPlato.validity.valueMissing) {
            error2(precioPlato, "Se ha de indicar un precio para el plato");
        } else if(precioPlato.validity.rangeUnderflow) {
            error2(precioPlato, "El precio del plato no puede ser inferior a 0");
        }
        return false;
    }
    return true;
}

//Apartado del formulario
function validar(e) {
    e.preventDefault();
    borrarErrores();

    var id = document.getElementById("_id").value;

    if(validaNombrePlato() && validaOrdenPlato() && validaPrecioPlato()) {
        if(id == "") {
            console.log("añadido de nuevo plato");
            nuevoPlato();
        } else {
            editarPlato();
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