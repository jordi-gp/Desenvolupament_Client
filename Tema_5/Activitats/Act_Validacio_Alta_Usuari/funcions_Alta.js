window.onload = main;

function main(){
    document.getElementById("Enviar").addEventListener("click", validar, false);
}

function validar(e){
    esborraError();

    if(validarNom() && confirm("Confirma si vols enviar el formulari")){
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

function esborraError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length; i++){
        formulari.elements[i].className = "";
    }

    document.getElementById("missatgeError").innerHTML = "";
}

function error2(element, missatge){
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}


function validarNom(){
    var nom = document.getElementById("nom");

    if(!nom.checkValidity()){
        if(nom.validity.valueMissing){
            error2(nom, "Has d'introduïr un nom!");
        }

        if(nom.validity.patternMismatch){
            error2(nom, "El nom ha de tindre entre 2 i 14 caracters");
        }
        return false;
    }
    return true;
}
