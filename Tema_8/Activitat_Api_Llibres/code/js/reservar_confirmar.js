window.onload = main;

function main() {
    getPedido();
    establirData();
    getDataDev();
    document.getElementById("dataPrestec").addEventListener("change", getDataDev);
    document.getElementById("btnReservar").addEventListener("click", validar, false);
}

//Dias de tiempo para la devolución
const diesDev = 20;

//Fecha actual
const data  = new Date();
const any = data.getFullYear();
var mes = data.getMonth() + 1;
var dia = data.getDate();

//API de libros
const apiLlibres = "https://www.serverred.es/api/reservas";

//Función para obtener el pedido del localStorage
function getPedido() {
    if(JSON.parse(localStorage.getItem("newPedido")) != null) {
        var pedido = JSON.parse(localStorage.getItem("newPedido"));
    }

    var infoUsu = document.getElementById("usuari");
    var infoLib = document.getElementById("llibre");

    infoUsu.setAttribute("value", pedido.nombreCliente);
    infoLib.setAttribute("value", pedido.libroComprado);
}

//Función para establecer la fecha por defecto seleccionada
function establirData() {
    var campData = document.getElementById("dataPrestec");    

    if(mes < 10) {
        mes = "0"+mes;
    }

    if(mes < 10) {
        dia = "0"+dia;
    }

    var fechaAct = any+"-"+mes+"-"+dia;
    campData.setAttribute("value", fechaAct);
    campData.setAttribute("max", fechaAct);
}

//Función para mostrar la fecha de devolución
function getDataDev() {
    //Transformación de la fecha seleccionada
    var dataVal = document.getElementById("dataPrestec").value;
    var dataParse = new Date(dataVal);

    //Suma de los dias de devolución en función de la fecha seleccionada
    var dataDevolucio = new Date();
    dataDevolucio.setDate(dataParse.getDate() + diesDev);

    //Conversión a string de la fecha de devolución
    var anyDev = dataDevolucio.getFullYear();
    var mesDev = dataDevolucio.getMonth() + 1;
    var diaDev = dataDevolucio.getDate();

    var fechaDev = diaDev+"/"+mesDev+"/"+anyDev;
    var valFechaDev = document.createTextNode(fechaDev);
    var infoDataDev = document.getElementById("dataDevolucio");

    infoDataDev.replaceChildren(valFechaDev);
}

//Validación de la fecha seleccionada por el usuario
function validaData() {
    var valData = new Date(document.getElementById("dataPrestec").value);
    var dataSel = document.getElementById("dataPrestec");
    
    if(!dataSel.checkValidity()) {
        if(dataSel.validity.valueMissing) {
            error2(dataSel, "S'ha de seleccionar una data!");
        } else if(dataSel.validity.rangeOverflow) {
            error2(dataSel, "La data no pot ser superior a la data actual!");
        }
        return false;
    }
    return true;
}

//Validación de la fecha seleccionada
//Error para avisar al usuario
function error2(element, missatge) {
    var error = document.getElementById("missatgeError");
    var errCont = document.createTextNode(missatge);

    error.appendChild(errCont);
    element.className = "error";
    element.focus();
}

//Borrado de los errores del formulario
function esborrarError() {
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }

    var msgError = document.getElementById("missatgeError");
    var contMsgError = document.createTextNode("");

    msgError.replaceChildren(contMsgError);
}

function validar(e) {
    esborrarError();
    e.preventDefault();

    if(validaData()){
        addReserva();
    } else {
        console.log("error");
    }
}

//En caso de ser correcta la validación, añadimos a la API la reserva
function addReserva() {
    //Objeto obtenido del localStorage
    if(JSON.parse(localStorage.getItem("newPedido")) != null) {
        var newReserva = JSON.parse(localStorage.getItem("newPedido"));
    }

    //Fecha de la reserva
    var dateVal = document.getElementById("dataPrestec").value;
    var dataRes = new Date(dateVal);

    //Objeto a añadir a la API
    var reserva = {
        usuario: newReserva.idCliente,
        libro: newReserva.idLibro,
        fecha: dataRes
    }

    //Subida del objeto a la API
    fetch(apiLlibres, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
    })
    .then(response => response.json())
    .then(data => location.assign("../html/index.html"))
    .catch((error) => {
        console.log("Error => ", error)
    })
}