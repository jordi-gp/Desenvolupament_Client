window.onload = main;

function main() {
    compruebaLog();
    getDatos();
    document.getElementById("confirmar").addEventListener("click", validar, false);
}

//Arrays con la información de la API
var arrMesas = [];
var arrBebidas = [];
var arrPlatos = [];

var bebidaSelec = [];
var platoSelec = [];

//API's de donde se obtiene la información
const apiMesas = "https://restaurante.serverred.es/api/mesas";
const apiPlatos = "https://restaurante.serverred.es/api/platos";
const apiBebidas = "https://restaurante.serverred.es/api/bebidas";
const apiComandas = "https://restaurante.serverred.es/api/comandas";

//Token del usuario
var token = JSON.parse(localStorage.getItem("auth-token"));

async function getDatos() {
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
            arrMesas.push(element);
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
            arrBebidas.push(element);
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
            arrPlatos.push(element);
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
    button.setAttribute("id", element._id);
    button.setAttribute("class", "mt-2 btn btn-primary p-3");
    button.setAttribute("value", element.numero);
    button.appendChild(val_buton);
    button.addEventListener("click", infoMesa);
    //button.onclick = infoMesa;

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
    button.setAttribute("id", element._id);
    button.setAttribute("class", "mt-2 btn btn-info p-3");
    button.setAttribute("value", element.nombre);
    button.appendChild(val_buton);
    button.addEventListener("click", compraBebida);

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
    button.setAttribute("id", element._id);
    button.setAttribute("class", "mt-2 btn btn-warning p-3");
    button.setAttribute("value", element.nombre);
    button.appendChild(val_button);
    button.addEventListener("click", compraPlato);

    div.appendChild(button);
    document.getElementById("platos" + element.orden).appendChild(div);
}

/*************************
 * FUNCIONES DE LA PÁGINA * 
 *************************/
//Mostrado de la información sobre la mesa
function infoMesa() {
    arrMesas.forEach(element => {
        document.getElementById(element._id).setAttribute("class", "mt-2 btn btn-primary p-3")
    })

    var infoMesa = arrMesas.find(item => item._id == this.id);
    var button = document.getElementById(infoMesa._id);
    button.setAttribute("class", "mt-2 btn btn-danger p-3");

    var info = document.createTextNode("Comensales:" + infoMesa.comensales + ", Descripcion:" + infoMesa.descripcion);
    document.getElementById("datosMesa").replaceChildren(info);
}

//Función para añadir bebidas a la comanda
function compraBebida() {
    const objBebida = arrBebidas.find(item => item._id == this.id);
    const comprova = bebidaSelec.find(item => item._id == this.id)

    if (comprova == undefined) {
        objBebida.cantidad = 1;
        bebidaSelec.push(objBebida);
    } else {
        comprova.cantidad += 1;
    }

    borrarBebida();
    addBebidaCompra();
}

function borrarBebida() {
    var filas = document.getElementById("comBebidas");

    if (filas.lastChild != null) {
        do {
            filas.lastChild.parentNode.removeChild(filas.lastChild);
        } while (filas.lastChild != null);
    }
}

function addBebidaCompra() {
    bebidaSelec.forEach(element => {
        //Botón para borrar las bebidas
        var button = document.createElement("button");
        var valButton = document.createTextNode("Borrar");
        button.setAttribute("class", "mt-2 btn btn-primary p-3");
        button.appendChild(valButton);

        //Nodos de texto de la tabla
        var valNombreBebida = document.createTextNode(element.nombre);
        var valCantidad = document.createTextNode(element.cantidad);

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");

        td1.appendChild(button);
        td2.appendChild(valNombreBebida);
        td3.appendChild(valCantidad);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        document.getElementById("comBebidas").appendChild(tr);
    })
}

function borrarPlatos() {
    var filas = document.getElementById("comPlatos");

    if (filas.lastChild != null) {
        do {
            filas.lastChild.parentNode.removeChild(filas.lastChild);
        } while (filas.lastChild != null);
    }
}

function addPlatoCompra() {
    platoSelec.forEach(element => {
        //Botón para borrar el plato
        var button = document.createElement("button");
        var valButton = document.createTextNode("Borrar");
        button.setAttribute("class", "mt-2 btn btn-primary p-3");
        button.appendChild(valButton);

        //Nodos de texto utilizados
        var valNombrePlato = document.createTextNode(element.nombre);
        var valCantidad = document.createTextNode(element.cantidad);

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");

        td1.appendChild(button);
        td2.appendChild(valNombrePlato);
        td3.appendChild(valCantidad);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        document.getElementById("comPlatos").appendChild(tr);
    })
}

//Función para añadir platos a la comanda
function compraPlato() {
    const objPlato = arrPlatos.find(item => item._id == this.id);
    const comprova = platoSelec.find(item => item._id == this.id);

    if (comprova == undefined) {
        objPlato.cantidad = 1;
        platoSelec.push(objPlato);
    } else {
        comprova.cantidad += 1;
    }

    borrarPlatos();
    addPlatoCompra();
}

/****************************** 
 * VALIDACIONES DEL FORMULARIO *
 ******************************/
function validaNombre() {
    var nombre = document.getElementById("nombre");

    if (!nombre.checkValidity()) {
        if (nombre.validity.valueMissing) {
            error2(nombre, "Se ha de indicar un nombre");
        } else if (nombre.validity.patternMismatch) {
            error2(nombre, "Se ha de indicar un nombre que contenga 4-60 caracteres");
        }
        return false;
    }
    return true;
}

function validaNumComensales() {
    var comensales = document.getElementById("comensales");

    if (!comensales.checkValidity()) {
        if (comensales.validity.valueMissing) {
            error2(comensales, "Se ha de indicar el número de comensales");
        } else if (comensales.validity.patternMismatch) {
            error2(comensales, "El número de comensales introducido no es correcto");
        } else if (comensales.validity.rangeOverflow) {
            error2(comensales, "El número de comensales no puede ser inferior a 1");
        }
        return false;
    }
    return true;
}

function validar(e) {
    e.preventDefault();
    borrarErrores();

    //En caso de validarse la comanda se añade a la lista
    if (validaNombre() && validaNumComensales()) {
        console.log("se ha validado el formulario")
        addComanda();
        return true;
    } else {
        console.log("no se ha validado el formulario");
        return false;
    }
}

//Función para añadir una nueva comanda
function addComanda() {
    var nombre = document.getElementById("nombre").value;
    var comensales = document.getElementById("comensales").value;
    var mesa = document.getElementsByClassName("mt-2 btn btn-danger p-3");
    var bebidas = bebidaSelec;
    var platos = platoSelec;

    var reserva = {
        nombre: nombre,
        comensales: comensales,
        estado: "Pendiente",
        bebidas: bebidas,
        mesa: mesa[0].id,
        platos: platos,
    }

    fetch(apiComandas, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token.token
        },
        body: JSON.stringify(reserva)
    })
    .then(response => response.json())
    .catch((error) => {
        console.log("Error => ", error);
    })
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