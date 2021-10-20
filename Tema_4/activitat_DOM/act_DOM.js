window.onload = main;

function main(){
    document.getElementById("crearAdresa").addEventListener("click", afegirElement);
}

//Funció per poder afegir adreses noves
function afegirElement(){

    //Valors que se li aplicaran a l'objecte
    var nomAdr = document.getElementById("nomAdresa");
    var urlAdr = document.getElementById("urlAdresa");

    //Creacio del objecte adresa
    var adresa = {
        aNom: nomAdr.value,
        aUrl: urlAdr.value
    }

    var arrElements = [];

    //Comprovació de que cap dels camps esta buit
    if(adresa.aNom === "" && adresa.aUrl === ""){
        console.error("Els dos camps estan buits!");
    } else if(adresa.aNom === ""){
        console.error("El camp de nom esta buit!");
    } else if(adresa.aUrl === "") {
        console.error("El camp de url esta buit!");
    } else {

        if(JSON.parse(localStorage.getItem("Elements")) != null){
            arrElements = JSON.parse(localStorage.getItem("Elements"));
        }
        
        arrElements.push(adresa);
        localStorage.setItem("Elements", JSON.stringify(arrElements));
    }
}

//Funció per mostrar les tasques
function mostrarElement(){
    var arrElements = [];

    if(JSON.parse(localStorage.getItem("Elements")) != null){
        arrElements = JSON.parse(localStorage.getItem("Elements"));
    }

    document.getElementById("llista");
}
