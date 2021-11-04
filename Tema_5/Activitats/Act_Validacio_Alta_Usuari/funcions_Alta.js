window.onload = main;

function main(){
    document.getElementById("Enviar").addEventListener("click", validar, false);
}

//Funció per validar el formulari
function validar(e){
    esborraError();

    if(validarNom() && validaCognoms && validaNIF && validaCorreu() && confirm("Confirma si vols enviar el formulari")){
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

//Funció per borrar els errors una vegada validat el formulari
function esborraError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length; i++){
        formulari.elements[i].className = "";
    }

    document.getElementById("missatgeError").innerHTML = "";
}

//Funció per escriure els missatges d'error
function error2(element, missatge){
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

//Funció per validar el nom
function validarNom(){
    var nom = document.getElementById("nom");

    if(!nom.checkValidity()){
        if(nom.validity.valueMissing){
            error2(nom, "Has d'introduïr un nom!");
        }

        if(nom.validity.patternMismatch){
            error2(nom, "El nom ha de tindre entre 2 i 20 caracters!");
        }

        return false;
    }
    return true;
}

//Funció per validar els cognoms
function validaCognoms(){
    var cognoms = document.getElementById("cognoms");

    if(!cognoms.checkValidity()){

        if(cognoms.validity.valueMissing){
            error2(cognoms, "Has d'introduïr els teus cognoms!");
        }

        if(nom.validity.patternMismatch){
            error2(cognoms, "Els cognoms han de tindre entre 2 i 30 caracters, a més han d'anar separats per un espai en blanc!");
        }

        return false;
    }
    return true;
}

//Funció per validar el NIF/NIE
function validaNIF(){
    var nif = document.getElementById("nif");

    if(!nif.checkValidity()){
        
        if(nif.validity.valueMissing){
            error2(nif, "Has d'introduïr un NIF o NIE!");
        }

        if(nif.validity.patternMismatch){
            error2(nif, "El NIF/NIE introduït no es correcte!");
        }

        return false;
    }
    return true;
}

//Funció per validar el correu electrònic
function validaCorreu(){
    var correu = document.getElementById("email1");
    var correuRep = document.getElementById("email2");

    if(!correu.checkValidity()){

        if(correu.validity.valueMissing){
            error2(correu, "Has d'introduir una direcció de correu electrònic!");
        }

        if(correu.validity.patternMismatch){
            error2(correu, "La direcció de correu electrònic no es correcte!");
        }

        if(correu.value != correuRep.value){
            error2(correu, "Els dos correus han de coincidir!");
        }


        return false;
    }
    return true;
}
