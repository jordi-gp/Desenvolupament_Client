window.onload = main;

function main(){
    document.getElementById("crearAdresa").addEventListener("click", afegirElement);
}

//Funció per poder afegir adreses noves
function afegirElement(nom, url){

    //Creacio del objecte adresa
    var adresa = {
        aNom: nom,
        aUrl: url
    }

    var a = document.getElementById("nomAdresa").value;
    var b = document.getElementById("urlAdresa").value;

    adresa.aNom = a;
    adresa.aUrl = b;

    var arrElements = new Array();
    
    arrElements.push(adresa);


}
