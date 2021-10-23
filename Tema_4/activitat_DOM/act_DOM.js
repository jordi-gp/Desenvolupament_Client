window.onload = main;

function main(){
    document.getElementById("crearAdresa").addEventListener("click", creaElement);
    carregarElements();
}

//Funció per poder afegir adreses noves
function creaElement(){

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
        afegirElement(adresa);
    }
}

//Funció per afegir un element nou
function afegirElement(elem){
    var arrElements = new Array;

    if(JSON.parse(localStorage.getItem("Elements")) != null){
        arrElements = JSON.parse(localStorage.getItem("Elements"));
    }
    
    var ul = document.getElementById("llista");

    //Creació d'elements
    var li = document.createElement("li");
    var but = document.createElement("input");
    var en = document.createElement("a");

    //Creació de nodes de text
    var cont = document.createTextNode(elem.aNom);

    //Soles nuestro señor Jesucristo sabe como ha funcionado esto sin petar
    but.setAttribute("type", "checkbox");
    but.setAttribute("name", "checkbox");
    li.setAttribute("id", elem.aNom);
    en.setAttribute("href", elem.aUrl);
    
    li.appendChild(but);
    li.appendChild(en, cont);
    en.appendChild(cont);
    ul.appendChild(li);
}

//Funció per poder carregar tots els elements
function carregarElements(){
    var arrElements = [];

    if(JSON.parse(localStorage.getItem("Elements")) != null){
        arrElements = JSON.parse(localStorage.getItem("Elements"));
    }

    arrElements.forEach(element => {
        afegirElement(element);
        console.log(arrElements);
    });
}
