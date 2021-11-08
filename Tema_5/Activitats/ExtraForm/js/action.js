window.onload = main;

function main(){
    //assignaId();
    creapErr();
    document.getElementById("tipo").addEventListener("change", canviaImatge2);
    document.getElementById("mostrarDescripcio").addEventListener("click", mostraDescripcio);
    document.getElementById("descripcioVal").addEventListener("input", contaPar);
    document.getElementById("enviar").addEventListener("click", validar);
}

const valNumSerie = new RegExp(/^\d{3}[A-Z]{4}([1-2]{1}|[A]{1})$/);

//Assignació de id's per a les opcions
/*function assignaId(){
    var options = document.getElementsByTagName("option");

    for(var i=0; i < options.length; i++){
        options[i].setAttribute("id", i);
    }
}*/

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
        foto.setAttribute("src", "img/produccion.jpg");
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

//Validació del camp Série
function validaNumSerie(){
    esborraError();

    var numSer = document.getElementById("serie");
    
    if(valNumSerie.test(numSer.value)){
        return true;
    } else {
        error2(numSer, "El número de serie introduït no es correcte!");
        return false;
    }
}

//Validació del camp textArea
function contaPar(){
    var txtAr = document.getElementsByName("descripcio");
    console.log(txtAr.value.length);
    

}

//APARTAT DE VALIDACIÓ DEL FORMULARI
//Creació del camp <p> per mostrar errors
function creapErr(){
    var divErr = document.getElementById("capaError");
    var errCont = document.createElement("p");

    errCont.setAttribute("id", "missatgeError");
    divErr.appendChild(errCont);

    var  numSer = document.getElementById("serie");
    numSer.setAttribute("required", "");
}

function error2(element, missatge){
    var pErr = document.getElementById("missatgeError");
    var errCont = document.createTextNode(missatge);

    pErr.appendChild(errCont);
    element.className = "error";
    element.focus();
}

function esborraError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length; i++){
        formulari.elements[i].className="";
    }

    var msgErr = document.getElementById("missatgeError");
    var contMsgErr = document.createTextNode("");

    msgErr.replaceChildren(contMsgErr);
}

function validar(e){
    esborraError();

    if(validaNumSerie() && confirm("Vols enviar l'informe?")){
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}
