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
    var ul = document.getElementById("llista");

    var li = document.createElement("li");
    var a = document.createElement("a");
    var cont = document.createTextNode(elem.aNom);
    var url = document.createTextNode(elem.aUrl);

    a.setAttribute("href", url);
    li.appendChild(a);
    li.appendChild(cont);
    li.setAttribute("href", url);
    li.setAttribute("type", "checkbox");
    ul.appendChild(li);

    console.log(li.hasAttribute("href"));
    console.log(a);
}

//Funció per poder carregar tots els elements
function carregarElements(){
    var arrElements = [];

    if(JSON.parse(localStorage.getItem("Elements")) != null){
        arrElements = JSON.parse(localStorage.getItem("Elements"));
    }

    arrElements.forEach(element => {
        afegirElement(element);
    });
}
