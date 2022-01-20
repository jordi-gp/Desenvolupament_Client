window.onload = main;

function main() {

}

var token = "";
const apiBebidas = "https://restaurante.serverred.es/api/bebidas";

function getToken() {
    if(JSON.parse(localStorage.getItem("auth-token")) != null) {
        token = JSON.parse(localStorage.getItem("auth-token"));
    }
    return token;
}

/*
*   TODO:
*   -Mostrar Begudes
*   -Afegir Begudes
*   -Editar Begudes
*   -Borrar Begudes
*/
