window.onload = main;

function main() {
    compruebaLog();
    getComanda();
    getInfoComanda();
}

var idComanda;
var token;

var bebidaComanda = [];
const url = "https:restaurante.serverred.es/api/comandas/";

//Obtención de los id
function getComanda() {
    if (JSON.parse(localStorage.getItem("auth-token")) != null) {
        token = JSON.parse(localStorage.getItem("auth-token"));

        if (localStorage.getItem("idComanda") != null) {
            idComanda = localStorage.getItem("idComanda");
        }
    }
}

//Obtención de la información de la comanda
function getInfoComanda() {
    fetch(url+idComanda, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => {
            bebidaComanda = data.data.data.bebidas;

            bebidaComanda.forEach(element => {
                listaBebida(element);
            })
        })
        .catch((error) => {
            console.log("ERROR => ", error);
        })
}

//TODO: this.function
function listaBebida(element) {

}