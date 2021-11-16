window.onload = main;

function main(){
    document.getElementById("siguiente").addEventListener("click", valida, false);
}

//VALIDACIÓ DEL FORMULARI
function validaNom(){
    var noms = document.getElementById("nombre");

    if(!noms.checkValidity()){
        if(noms.validity.ValueMissing){
            error2(noms, "Debes introducir tu nombre y apellidos!");
        } else if(noms.validity.patternMissmatch){
            error2(noms, "El nombre o apellidos introducido no es correcto!");
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
            error2(correu, "Debes introducir tu correo electrònico!");
        } else if(correu.validity.patternMissmatch){
            error2(correu, "El correu electrònico introducido no es correcto!");
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
            error2(telefon, "Debes introducir tu número de telèfono!");
        } else if(telefon.patternMissmatch){
            error2(telefon, "El número de telèfono introducido no es correcto!");
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

    for(var i=0; i < formulari.elements.length-1; i++){
        formulari.elements[i].className = "form-control";
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
        window.location = "FDArticles.html";
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}
