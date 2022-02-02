window.onload = main;

function main() {
    compruebaLog();
    getComanda();
    mostraInfo();
    listaBebida();
    lista();
}

var idComanda;
var token;
var info;

var bebidaComanda = [];
const url = "https://restaurante.serverred.es/api/comandas/";
const apiBebidas = "https://restaurante.serverred.es/api/bebidas";

//Obtención de los id
function getComanda() {
    if (JSON.parse(localStorage.getItem("auth-token")) != null) {
        token = JSON.parse(localStorage.getItem("auth-token"));

        if (JSON.parse(localStorage.getItem("info") != null)) {
            info = JSON.parse(localStorage.getItem("info"));
        }
    }
}

//TODO: this.function
function mostraInfo() {
    document.getElementById("nombre").innerText = info.nombre;
    document.getElementById("comensales").innerText = info.comensales;
    document.getElementById("mesa").innerText = info.mesa;
    document.getElementById("camarero").innerText = info.camarero;
    document.getElementById("fechaEntrada").innerText = info.hora;
}

function listaBebida() {
    console.log(url + info.idComanda)
    fetch(url + info.idComanda, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => data.data.data.bebidas.forEach(element => {
            muestraBebidas(element);
        }))
}

function lista() {
    fetch(apiBebidas, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token.token
        }
    })
    .then(response => response.json())
    .then(data => data.data.data.forEach(element => {
        bebidas(element);
    }))
}

function bebidas(element) {
    var div = document.createElement("div");
    var button = document.createElement("button");
    var val_button = document.createTextNode(element.nombre);

    div.setAttribute("class", "col");

    button.appendChild(val_button);

    button.setAttribute("class", "mt-2 btn btn-info p-3");
    button.setAttribute("id", element._id);
    button.setAttribute("value", element.nombre);

    div.appendChild(button);
    document.getElementById("bebidas").appendChild(div);
}

function muestraBebidas(element) {
    var button = document.createElement("button");
    var val_button = document.createTextNode("Borrar");
    button.appendChild(val_button);
    button.setAttribute("id", element._id);
    button.setAttribute("class", "btn btn-primary btn-lg p-2");

    var nombreBebida = document.createTextNode(element.nombre);
    var cantidadBebida = document.createTextNode(element.cantidad);

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");

    td1.appendChild(button);
    td2.appendChild(nombreBebida);
    td3.appendChild(cantidadBebida);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    document.getElementById("comBebidas").appendChild(tr);
}