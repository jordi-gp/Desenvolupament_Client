window.onload = main;

function main(){
    assignaId();
    document.getElementById("tipo").addEventListener("change", canviaImatge2);
    document.getElementById("mostrarDescripcio").addEventListener("click", mostraDescripcio);
}

const valNumSerie = new RegExp(/^\d{3}[A-Z]{4}([1-2]{1}|[A]{1})$/)

//Assignació de id's per a les opcions
function assignaId(){
    var options = document.getElementsByTagName("option");

    for(var i=0; i < options.length; i++){
        options[i].setAttribute("id", i);
    }
}

//FORMA DE CANVIAR L'IMATGE SELECCIONADA 1
/*function canviaImatge(){
    var lista = document.getElementById("tipo");
    var idElem = lista[lista.selectedIndex].id;

    var foto = document.getElementById("imagen");

    if(idElem == 0){
        foto.setAttribute("src", "img/distribucio.jpg");
    } else if(idElem == 1){
        foto.setAttribute("src", "img/oficina.jpg");
    } else if(idElem == 2){
        foto.setAttribute("src", "img/producion.jpg");
    }
}*/

//FORMA DE CANVIAR L'IMATGE SELECCIONADA 2 (més óptima pense yo)
function canviaImatge2(){
    var lista = document.getElementById("tipo");
    var nomElem = lista[lista.selectedIndex].value;

    var foto = document.getElementById("imagen");
    var rutaImg = "img/"+nomElem+".jpg";

    foto.setAttribute("src", rutaImg);
}

//Funció per mostrar el camp textArea
function mostraDescripcio(){
    var campDesc = document.getElementById("fDescripcio");
    campDesc.style.display = "block";
}

//APARTAT DE VALIDACIÓ DEL FORMULARI

