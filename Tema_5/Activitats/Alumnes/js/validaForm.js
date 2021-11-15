window.onload = main;

function main(){
    document.getElementById("siguiente").addEventListener("click", valida, false);
}

//VALIDACIÓ DEL FORMULARI
function validaNom(){
    var noms = document.getElementById("nombre");

    esborraError();

    if(!noms.checkValidity()){
        if(noms.validity.ValueMissing){
            error2(noms, "Has d'introduir el teu nom i cognoms!");
        } else if(noms.validity.patternMissmatch){
            error2(noms, "El nom/cognoms introduït no es correcte!");
        }
        return false;
    }
    
    return true;
}

function validaCorreu(){
    var correu = document.getElementById("email");

    esborraError();

    if(!correu.checkValidity()){
        if(correu.validity.ValueMissing){
            error2(correu, "Has d'introduïr una direcció de correu electrònic!");
        } else if(correu.validity.patternMissmatch){
            error2(correu, "El correu introduït no compleix amb els requisits mínims!");
        }
        return false;
    }
    
    return true;
}

function validaTelefon(){
    var telefon = document.getElementById("telefono");

    esborraError();

    if(!telefon.checkValidity()){
        if(telefon.validity.ValueMissing){
            error2(telefon, "Has d'introduir el teu número de telèfon!");
        } else if(telefon.patternMissmatch){
            error2(telefon, "El telèfon introduït no es vàlid!");
        }
        return false;
    }
    
    return true;
}

//CAMP DELS ERRORS
function error2(element, missatge){
    document.getElementById("mensajeError").innerHTML = missatge;
    element.className = "text-danger";
    element.focus();
    element.focus();

    console
}

function esborraError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length; i++){
        formulari.elements[i].className = "";
    }

    /*var missatgeError = document.getElementById("mensajeError");
    var contMsgerr = document.createTextNode("");

    missatgeError.replaceChildren(contMsgerr);+*/
}

//FUNCIÓ PER VALIDAR EL FORMULARI
function valida(e){
    esborraError();
    const url = "FDArticles.html";

    if(validaNom() && validaCorreu() && validaTelefon()){
        window.location = url;
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}
