window.onload = main;

function main() {
    getUsuarios();
}

//Array donde se almacena la información de las api
var infoUsu = [];
var infoLib = [];
var infoReserva = [];

//Enlaces a las apis utilizadas
const apiLibros = "https://serverred.es/api/libros";
const apiReservas = "https://serverred.es/api/reservas";
const apiUsuarios = "https://serverred.es/api/usuarios";

//Obtención de la información de la api de usuarios
function getUsuarios(){
    fetch(apiUsuarios)
    .then(response => response.json())
    .then(data => {
        data.resultado.forEach(element => {
            infoUsu.push(element);
        })
        getLibros();
    })
}

//Obtención de la información de la api de libros
function getLibros(){
    fetch(apiLibros)
    .then(response => response.json())
    .then(data => {
        data.resultado.forEach(element => {
            infoLib.push(element);
        })
    })
    getReservas();
}

//Obtención de las reservas que hay registradas en la API
function getReservas() {
    //Tabla a la que se aplicará la información de la API
    var tabla = document.getElementById("files");

    fetch(apiReservas)
    .then(response => response.json())
    .then(data => {
        data.resultado.forEach(element => {
            //Fecha de reserva
            var dataRes = new Date(element.fecha)
            var anyReserva = dataRes.getFullYear();
            var mesReserva = dataRes.getMonth() + 1;
            var diaReserva = dataRes.getDate();

            if(mesReserva < 10) {
                mesReserva = "0" + mesReserva;
            }

            if(diaReserva < 10) {
                diaReserva = "0" + diaReserva;
            }

            //Fecha de devolución
            var dataDev = new Date(element.fechaDevolucion);
            var anyDevolucio = dataDev.getFullYear();
            var mesDevolucio = dataDev.getMonth() + 1;
            var diaDevolucio = dataDev.getDate();

            if(mesDevolucio < 10) {
                mesDevolucio = "0" + mesDevolucio;
            }

            if(diaDevolucio < 10) {
                diaDevolucio = "0" + diaDevolucio;
            }

            //Nodos de texto
            var usuario = document.createTextNode(buscarUsuario(element.usuario));
            var libro = document.createTextNode(buscarLibro(element.libro));
            var fechaRes = document.createTextNode(anyReserva+"-"+mesReserva+"-"+diaReserva);
            var fechaDev = document.createTextNode(anyDevolucio+"-"+mesDevolucio+"-"+diaDevolucio);

            //Elementos del HTML
            var tr = document.createElement("tr");
            var td_1 = document.createElement("td");
            var td_2 = document.createElement("td");
            var td_3 = document.createElement("td");
            var td_4 = document.createElement("td");

            //Añadido de información a cada campo
            td_1.appendChild(usuario);
            td_2.appendChild(libro);
            td_3.appendChild(fechaRes);
            td_4.appendChild(fechaDev);

            //Añadido de las columnas a cada fila
            tr.appendChild(td_1);
            tr.appendChild(td_2);
            tr.appendChild(td_3);
            tr.appendChild(td_4);

            //Añadido de las filas a la tabla
            tabla.appendChild(tr);
        })
    })
}

//Búsqueda para obtener el nombre de usuario
function buscarUsuario(idUsuario) {
    var idAux = "Usuario no encontrado";
    var i = 0;  
    
    do{  
        if(idUsuario == infoUsu[i]._id) {
           idAux = infoUsu[i].nombre;
        }

        i++;
    } while(idAux == "Usuario no encontrado" && i < infoUsu.length);
    return idAux;
}

//Búsqueda para obtener el nombre del libro reservado
function buscarLibro(idLibro) {
    var idLib = "Libro no encontrado";
    var i = 0;

    do {
        if(idLibro == infoLib[i]._id) {
            idLib = infoLib[i].titulo;
        }

        i++
    } while(idLib == "Libro no encontrado" && i < infoLib.length);
    return idLib;
}