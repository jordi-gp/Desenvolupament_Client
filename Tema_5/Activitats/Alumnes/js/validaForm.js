window.onload = main;

function main(){
    document.getElementById("siguiente").addEventListener("click", valida, false);
}

function prova(){
    window.location.assign("FDArticles.html");
}

//VALIDACIÓ DEL FORMULARI
function validaNom(){
    var noms = document.getElementById("nombre");

    if(!noms.checkValidity()){
        
        if(noms.validity.valueMissing){
            console.log("error");
            error2(noms, "Debes introducir tu nombre y apellidos!");
        } else if(noms.validity.patternMismatch){
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
        if(correu.validity.valueMissing){
            error2(correu, "Debes introducir tu correo electrònico!");
        } else if(correu.validity.patternMismatch){
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
        if(telefon.validity.valueMissing){
            error2(telefon, "Debes introducir tu número de telèfono!");
        } else if(telefon.validity.patternMismatch){
            error2(telefon, "El número de telèfono introducido no es correcto!");
        }
        return false;
    }
    esborraError();
    return true;
}

//CAMP DEL LOCAL STORAGE
function generaUsuari(){
    var nom = document.getElementById("nombre").value;
    var correu = document.getElementById("email").value;
    var telefon = document.getElementById("telefono").value;
    var total = 0;

    var usuari = {
        nomUsu: nom,
        corrUsu: correu,
        telUsu: telefon,
        producte: [],
        total
    }

    localStorage.setItem("Usuari", JSON.stringify(usuari));
    console.log(JSON.parse(localStorage.getItem("Usuari")));
}

//CAMP DELS ERRORS
function error2(element, missatge){
    var error = document.getElementById("mensajeError");
    var errCont = document.createTextNode(missatge);

    error.appendChild(errCont);

    element.className = "form-control border-danger";
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
    e.preventDefault();
    esborraError();

    if(validaNom() && validaCorreu() && validaTelefon()){
        generaUsuari();
        window.location.assign("FDArticles.html");
        return true;
    } else {
        return false;
   }
}