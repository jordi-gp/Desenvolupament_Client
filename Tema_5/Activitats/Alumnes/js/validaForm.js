window.onload = main;

function main(){
    document.getElementById("siguiente").addEventListener("click", valida, false);
}

//VALIDACIÓ DEL FORMULARI
function validaNom(){
    var noms = document.getElementById("nombre");

    if(!noms.checkValidity()){
        if(noms.validity.ValueMissing){
            //console.error("A")
            error2(noms, "Has d'introduir el teu nom i cognoms!");
        } else if(noms.validity.patternMissmatch){
            error2(noms, "El nom/cognoms introduït no es correcte!");
        }
        return false;
    }
    esborraError();
    return true;
}

function validaCorreu(){
    var correu = document.getElementById("email");

    if(!correu.checkValidity()){
        if(correu.validity.ValueMissing){
            error2(correu, "Has d'introduïr una direcció de correu electrònic!");
        } else if(correu.validity.patternMissmatch){
            error2(correu, "El correu introduït no compleix amb els requisits mínims!");
        }
        return false;
    }
    esborraError();
    return true;
}

function validaTelefon(){
    var telefon = document.getElementById("telefono");

    if(!telefon.checkValidity()){
        if(telefon.validity.ValueMissing){
            error2(telefon, "Has d'introduir el teu número de telèfon!");
        } else if(telefon.patternMissmatch){
            error2(telefon, "El telèfon introduït no es vàlid!");
        }
        return false;
    }
    esborraError();
    return true;
}

//CAMP DELS ERRORS
function error2(element, missatge){
    var error = document.getElementById("mensajeError");
    var errCont = document.createTextNode(missatge);

    error.appendChild(errCont);
    element.className = "text-danger";
    element.focus();
}

function esborraError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length; i++){
        formulari.elements[i].className = "";
    }

    var missatgeError = document.getElementById("mensajeError");
    var contMsgerr = document.createTextNode("");

    missatgeError.replaceChildren(contMsgerr);
}

//FUNCIÓ PER VALIDAR EL FORMULARI
function valida(e){
    esborraError();
    const url = "FDArticles.html";

    if(validaNom() && validaCorreu() && validaTelefon()){
        window.location = url;
        console.log("a");
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}
