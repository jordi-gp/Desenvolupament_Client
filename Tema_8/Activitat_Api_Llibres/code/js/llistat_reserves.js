window.onload = main;

function main() {
    getUsuarios();
}

//Array donde se almacena la información de las api
var infoUsu = [];
var infoLib = [];

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
        return infoUsu;
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
        provar();
    })
}

function provar() {
    console.log(infoLib);
    console.log(infoUsu);
}
