window.onload = main;

async function main() {
    compruebaLog();
    getCamareros();
    document.getElementById("newComanda").addEventListener("click", altaComanda);
}

function altaComanda() {
    location.assign("../html/altaComandas.html");
}

var arrComandas = [];
var arrCamareros = [];
var arrMesas = [];

token = JSON.parse(localStorage.getItem("auth-token"));

const apiComandas = "https://restaurante.serverred.es/api/comandas";
const apiCamareros = "https://restaurante.serverred.es/api/camareros";
const apiMesas = "https://restaurante.serverred.es/api/mesas";

async function getComandas() {
    await fetch(apiComandas, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        //data => arrComandas = data.data.data
        .then(data => {
            arrComandas = data.data.data;
            arrComandas.forEach(element => {
                addComanda(element);
            })
        })
        .catch((error) => {
            console.log("Error => ", error);
        });
}

async function getCamareros() {
    await fetch(apiCamareros, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => {
            arrCamareros = data.data.data;
            getMesas();
        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}

async function getMesas() {
    await fetch(apiMesas, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => {
            arrMesas = data.data.data;
            getComandas();
        })
}

function addComanda(element) {
    //Botones para editar la comanda de bebidas
    var logoSumBebidas = document.createElement("i");
    logoSumBebidas.setAttribute("class", "fas fa-plus");
    var editBebidas = document.createElement("button");
    editBebidas.setAttribute("id", element._id);
    editBebidas.setAttribute("class", "btn btn-info btn-lg p-2");
    var val_edit_bebidas = document.createTextNode("Bebidas");
    editBebidas.appendChild(logoSumBebidas);
    editBebidas.appendChild(val_edit_bebidas);
    editBebidas.addEventListener("click", editaBebidas)

    //Botón para editar la comanda de platos
    var logoSumPlatos = document.createElement("i");
    logoSumPlatos.setAttribute("class", "fas fa-plus");
    var editPlatos = document.createElement("button");
    editPlatos.setAttribute("class", "btn btn-warning btn-lg m-2 p-2");
    var val_edit_platos = document.createTextNode("Platos");
    editPlatos.appendChild(logoSumPlatos);
    editPlatos.appendChild(val_edit_platos);

    //Información obtenida del JSON
    var nombre = element.nombre;
    var mesa = element.mesa;
    var comensales = element.comensales;
    var camarero = element.user;
    var fechaEnt = new Date(element.fechaEntrada);

    //Nodos de texto utilizados
    var val_nombre = document.createTextNode(nombre);
    var val_mesa = document.createTextNode(buscaMesa(mesa));
    var val_comensales = document.createTextNode(comensales);
    var val_camarero = document.createTextNode(buscarCamarero(camarero));
    var val_fecha = document.createTextNode(fechaEnt.getHours() + ":" + fechaEnt.getDate());
    
    //Elementos del HTMl
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");
    var td7 = document.createElement("td");

    //Añadido de la información a los campos
    td1.appendChild(editBebidas);
    td2.appendChild(editPlatos);
    td3.appendChild(val_nombre);
    td4.appendChild(val_mesa);
    td5.appendChild(val_comensales);
    td6.appendChild(val_camarero);
    td7.appendChild(val_fecha);

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

function editaBebidas() {
    var url = apiComandas+"/"+this.id;

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token.token
        }
    })
    .then(response => response.json())
    //.then(data => )
}

//TODO:
//Función para encontrar el nombre del camarero
function buscarCamarero(val_camarero) {
    var infoCam = arrCamareros.find(item => item._id == val_camarero);
    if(infoCam != undefined) {
        return infoCam.name;
    } else {
        return "Camarero no encontrado";
    }
    
}

//Función para encontrar el nombre de la mesa
function buscaMesa(val_mesa) {
    var infoMesa = arrMesas.find(item => item._id == val_mesa);
    
    if(infoMesa != undefined) {
        return infoMesa.numero;
    } else {
        return "Mesa no encontrada";
    }
}

//TODO: Comprovar perqué no funciona aquesta funció
/*function buscarMesa(mesa) {
    //console.log(val_mesa, arrMesas)
    var infoMesa = arrMesas.find(item => item._id == mesa);
    console.log(infoMesa);
}*/

//Función para añadir comandas
//Llamada a la API donde se recogen las comanda