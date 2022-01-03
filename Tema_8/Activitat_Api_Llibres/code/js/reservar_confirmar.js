window.onload = main;

function main() {
    getPedido();
    dataRes();
}

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

/*Selección de una fecha no mayor a la actual y
mostrar la fecha de devolución*/
function dataRes() {
    //Obtención de la fecha actual
    var data = new Date();

    var añoAct = data.getFullYear();
    var mesAct = data.getMonth()+1;
    var diaAct = data.getDate();

    var dataAct = añoAct+"-"+mesAct+"-"+diaAct;

    //Atributo para que la fecha no sea superior a la actual
    var campData = document.getElementById("dataPrestec");
    campData.setAttribute("max", dataAct);

    campData.addEventListener("change", dataPrest)
}

//Función para seleccionar la fecha del prestamo y la fecha de devolución
function dataPrest() {
    var data = document.getElementById("dataPrestec");
    
    var getFecha = new Date(data.value);
    
    var año = getFecha.getFullYear();
    var mes = getFecha.getMonth() + 1;
    var dia = getFecha.getDate() + 20;

    var nuevaFecha = año+"-"+mes+"-"+dia;
    
    var fecha = new Date(nuevaFecha);

    console.log(fecha);
}
