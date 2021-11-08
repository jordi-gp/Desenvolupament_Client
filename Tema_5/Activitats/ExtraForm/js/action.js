window.onload = main;

function main(){
    //assignaId();
    document.getElementById("tipo").addEventListener("change", canviaImatge2);
    document.getElementById("mostrarDescripcio").addEventListener("click", mostraDescripcio);
    document.getElementsByName("descripcio")[0].addEventListener("input", contaPar);
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

    var campDesVal = document.getElementsByTagName("textarea");
    campDesVal[0].setAttribute("required", "");

    var p = document.createElement("p");
    p.setAttribute("id", "numPar");
    campDesc.appendChild(p);
}

//Validació del camp Série
function validaNumSerie(){

    var numSer = document.getElementById("serie");
    
    if(numSer.value == ""){
        error2(numSer, "Has d'emplenar aquest camp obligatoriament!");
        return false;
    } else if(!valNumSerie.test(numSer.value)){
        error2(numSer, "El número de serie introduït no es correcte!");
        return false;
    } else {
        return true;
    }
    
}

//Funció per contar el nombre de paraules del textarea
function contaPar(){
    var a = document.getElementsByName("descripcio")[0].value;
    var b = document.getElementsByName("fDescripcio");

    //Substitució dels salts de línea
    a = a.replace(/\r?\n/g, " ");
    //Substitució dels espais separats per un sol
    a = a.replace(/[]+/g, " ");
    //Es lleven els espais al principi i al final
    a = a.replace(/^ /, "");
    a = a.replace(/ $/, "");
    //Substitució de punts i comes per espais en blanc
    a = a.replace(/[,]/g, " ");
    a = a.replace(/[.]/g, " ");

    var b = a.split(" ");

    if(a == ""){
        b.length = 0;
    }

    var p = document.getElementById("numPar");
    var pVal = document.createTextNode("Número de paraules: "+b.length);

    p.replaceChildren(pVal);
}

//APARTAT DE VALIDACIÓ DEL FORMULARI
function error2(element, missatge){
    var err = document.getElementById("capaError");
    var errCont = document.createTextNode(missatge);

    err.appendChild(errCont);
    element.className = "error";
    element.focus();
}

function esborraError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length; i++){
        formulari.elements[i].className="";
    }

    var msgErr = document.getElementById("capaError");
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
