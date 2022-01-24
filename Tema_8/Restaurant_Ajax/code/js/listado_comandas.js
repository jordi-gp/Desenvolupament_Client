window.onload = main;

function main() {
    compruebaLog();
    getComandas();
}

var arrComandas = [];
var arrCamareros = [];
var arrMesas = [];

token = JSON.parse(localStorage.getItem("auth-token"));

const apiComandas = "https://restaurante.serverred.es/api/comandas";
const apiCamareros = "https://restaurante.serverred.es/api/camareros";
const apiMesas = "https://restaurante.serverred.es/api/mesas";

function getComandas() {
    fetch(apiComandas, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => data.data.data.forEach(element => {
            addComanda(element);
            arrComandas.push(element);
        }))
        .then(getCamareros())
        .catch((error) => {
            console.log("Error => ", error);
        });
}

function getCamareros() {
    fetch(apiCamareros, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token.token
        }
    })
    .then(response => response.json())
    .then(data => data.data.data.forEach(element => {
        arrCamareros.push(element);
    }))
    .then(getMesas())
    .catch((error) => {
        console.log("Error => ", error);
    })
}

function getMesas() {
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
    }))
    .then(console.log(arrComandas), console.log(arrCamareros), console.log(arrMesas))
}

function addComanda(element) {
    //Botones para editar la comanda de bebidas
    //Botón para editar la comanda de platos

    //Información obtenida del JSON
    var nombre = element.nombre;
    var mesa = element.mesa;
    var comensales = element.comensales;
    var camarero = element.user;
    var fechaEnt = element.fechaEntrada;

    //Nodos de texto utilizados
    var val_nombre = document.createTextNode(nombre);
    var val_mesa = document.createTextNode(buscarMesa(mesa));
    var val_comensales = document.createTextNode(comensales);
    var val_camarero = document.createTextNode(buscarCamarero(camarero));
    var val_fecha = document.createTextNode(fechaEnt)

    //Elementos del HTMl
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");

    console.log(element.fechaEnt);
    //Añadido de la información a los campos
    td3.appendChild(val_nombre);
    td4.appendChild(val_mesa);
    td5.appendChild(val_comensales);
    td6.appendChild(val_camarero);

    //Añadido de las columnas a la tabla
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);

    document.getElementById("files").appendChild(tr);
}

//TODO:
//Función para encontrar el nombre del camarero
function buscarCamarero(val_camarero) {
    arrCamareros.forEach(element => {
        if(val_camarero == element._id) {
            val_camarero = element.name;
            return val_camarero;
        }
    })
}

//Función para encontrar el nombre de la mesa
function buscarMesa(val_mesa) {
    arrMesas.forEach(element => {
        if(val_mesa == element._id) {
            val_mesa =  element.numero;
            return val_mesa;
        }
    })
}

//Función para añadir comandas
//Llamada a la API donde se recogen las comanda
