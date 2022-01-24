window.onload = main;

function main() {
    compruebaLog();
    getDatos();
}

//API's de donde se obtiene la información
const apiMesas = "https://restaurante.serverred.es/api/mesas";
const apiPlatos = "https://restaurante.serverred.es/api/platos";
const apiBebidas = "https://restaurante.serverred.es/api/bebidas";


//Token del usuario
var token = JSON.parse(localStorage.getItem("auth-token"));

async function getDatos() {
    //TODO:
    getMesas();
    getBebidas();
    getPlatos();
}

/*********************
* LLAMADAS A LAS API *
*********************/
async function getMesas() {
    fetch(apiMesas, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => data.data.data.forEach(element => {
            addMesa(element);
        }))
        .catch((error) => {
            console.log("Error => ", error);
        })
}

async function getBebidas() {
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
        }))
        .catch((error) => {
            console.log("Error => ", error);
        })
}

async function getPlatos() {
    fetch(apiPlatos, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => data.data.data.forEach(element => {
            addPlatos(element);
        }))
        .catch((error) => {
            console.log("Error => ", error);
        })
}

/*****************************
* AÑADIDO DE BOTONES AL HTML *
*****************************/

//Función para añadir las bebidas disponibles
function addMesa(element) {
    //Bloque div con la información
    var div = document.createElement("div");
    div.setAttribute("class", "col");

    //Botón con la información de las mesas
    var button = document.createElement("input");
    var val_buton = document.createTextNode(element.numero);

    button.setAttribute("type", "button");
    button.setAttribute("class", "mt-2 btn btn-primary p-3");
    button.setAttribute("value", element.numero);
    button.appendChild(val_buton);

    div.appendChild(button);
    document.getElementById("mesas").appendChild(div);
}

//Función para añadir las bebidas disponibles
function addBebida(element) {
    //Bloque div con la información
    var div = document.createElement("div");
    div.setAttribute("class", "col");

    //Botón con la información de las bebidas
    var button = document.createElement("button");
    var val_buton = document.createTextNode(element.nombre);

    button.setAttribute("type", "button");
    button.setAttribute("class", "mt-2 btn btn-info p-3");
    button.setAttribute("value", element.nombre);
    button.appendChild(val_buton);

    div.appendChild(button);
    document.getElementById("bebidas").appendChild(div);
}

//Función para añadir los platos disponibles
function addPlatos(element) {
    //Bloque div con la información
    var div = document.createElement("div");
    div.setAttribute("class", "col");

    //Botón con la información de los platos
    var button = document.createElement("button");
    var val_button = document.createTextNode(element.nombre);

    button.setAttribute("type", "button");
    button.style.background = "#ffc309";
    button.style.border = "#ffc309";
    button.setAttribute("class", "mt-2 btn btn-info p-3");
    button.setAttribute("value", element.nombre);
    button.appendChild(val_button);

    div.appendChild(button);
    document.getElementById("platos"+element.orden).appendChild(div);
}

/****************************** 
* VALIDACIONES DEL FORMULARIO *
******************************/
function validaNombre() {
    var nombre = document.getElementById("nombre");

    if(!nombre.checkValidity()) {
        if(nombre.validity.valueMissing) {
            error2(nombre, "Se ha de indicar un nombre");
        } else if(nombre.validity.patternMismatch) {
            error2(nombre, "Se ha de indicar un nombre que contenga 4-60 caracteres");
        }
        return false;
    }
    return true;
}

function validaNumComensales() {
    var comensales = document.getElementById("comensales");

    if(!comensales.checkValidity()) {
        if(comensales.validity.valueMissing) {
            error2(comensales, "Se ha de indicar el número de comensales");
        } else if(comensales.validity.patternMismatch) {
            error2(comensales, "El número de comensales introducido no es correcto");
        } else if(comensales.validity.rangeOverflow) {
            error2(comensales, "El número de comensales no puede ser inferior a 1");
        }
        return false;
    }
    return true;
}

function error2(element, missatge) {
    var msg = document.createTextNode(missatge);
    var error = document.getElementById("missatgeError");

    error.replaceChildren(msg);
    element.focus();
}

function borrarErrores() {
    var msgError = document.createTextNode("");
    var error = document.getElementById("missatgeError");

    error.replaceChildren(msgError);
}