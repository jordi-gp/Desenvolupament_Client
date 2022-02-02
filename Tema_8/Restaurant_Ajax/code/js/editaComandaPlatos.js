window.onload = main;

function main() {
    compruebaLog();
    getInfo();
}

var token;
var comanda;
const urlPlatos = "https:restaurante.serverred.es/api/platos/";
const urlComandas = "https:restaurante.serverred.es/api/comandas/"

function getInfo() {
    if (JSON.parse(localStorage.getItem("auth-token")) != null) {
        token = JSON.parse(localStorage.getItem("auth-token"));

        if (JSON.parse(localStorage.getItem("infoPlato")) != null) {
            comanda = JSON.parse(localStorage.getItem("infoPlato"));
        }
    }

    getInfoComanda();
    getPlatosComanda();
    getPlatosApi();
}

function getInfoComanda() {
    var nombre = document.createTextNode(comanda.nombre);
    var comensales = document.createTextNode(comanda.comensales);
    var mesa = document.createTextNode(comanda.mesa);
    var camarero = document.createTextNode(comanda.camarero);
    var hEntrada = document.createTextNode(comanda.hora);

    document.getElementById("nombre").appendChild(nombre);
    document.getElementById("comensales").appendChild(comensales);
    document.getElementById("mesa").appendChild(mesa);
    document.getElementById("camarero").appendChild(camarero);
    document.getElementById("fechaEntrada").appendChild(hEntrada);
}

function getPlatosComanda() {
    const urlCom = urlComandas + comanda.idComanda;

    fetch(urlCom, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => data.data.data.platos.forEach(element => {
            listaPlatosComanda(element);
        }))
}

function getPlatosApi() {
    fetch(urlPlatos, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => data.data.data.forEach(element => {
            getPlatos(element);
        }))
}

function listaPlatosComanda(element) {
    var button = document.createElement("button");
    var val_button = document.createTextNode("Borrar");

    button.appendChild(val_button);
    button.setAttribute("id", element._id);
    button.setAttribute("class", "btn btn-primary btn-lg borrar");

    var plato = document.createTextNode(element.nombre);
    var orden = document.createTextNode(element.orden);
    var cantidad = document.createTextNode(element.cantidad);

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");

    td1.appendChild(button);
    td2.appendChild(plato);
    td3.appendChild(orden);
    td4.appendChild(cantidad);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    document.getElementById("comPlatos").appendChild(tr);
}

function getPlatos(element) {
    var button = document.createElement("button");
    var div = document.createElement("div");
    var nombrePlato = document.createTextNode(element.nombre);

    var orden = "platos" + element.orden;

    div.setAttribute("class", "col");

    button.appendChild(nombrePlato);
    button.setAttribute("id", element._id);
    button.setAttribute("class", "mt-2 btn btn-warning p-3");

    div.appendChild(button);
    document.getElementById(orden).appendChild(div);
}