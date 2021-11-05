window.onload = main;

function main(){
    mostraCaptcha();
    document.getElementById("Enviar").addEventListener("click", validar, false);
}

//Definició dels nombres aleatoris utilitzats en el captcha
var rand1 = Math.floor(Math.random()*10);
var rand2 = Math.floor(Math.random()*10);
var rand3 = Math.floor(Math.random()*10);
var rand4 = Math.floor(Math.random()*10);

//Funció per validar el formulari
function validar(e){
    esborraError();

    if(validarNom() && validaCognoms() && validaNIF() && validaCorreu() && validaNick() && validaPassword() && captcha1() && captcha2() && confirm("Confirma si vols enviar el formulari")){
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
    esborraError();
    return true;
}

//Funció per validar els cognoms
function validaCognoms(){
    var cognoms = document.getElementById("cognoms");

    if(!cognoms.checkValidity()){

        if(cognoms.validity.valueMissing){
            error2(cognoms, "Has d'introduïr els teus cognoms!");
        }

        if(cognoms.validity.patternMismatch){
            error2(cognoms, "Els cognoms han de tindre entre 2 i 30 caracters, a més han d'anar separats per un espai en blanc!");
        }

        return false;
    }
    esborraError();
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
    esborraError();
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

        return false;
    }
     //comprovació de que els dos correus introduits són iguals
    if(correu.value != correuRep.value){
        error2(correu, "Els dos correus han de coincidir!");
        return false;
    }

    return true;
}

//Funció per validar el nick d'usuari
function validaNick(){
    var nick = document.getElementById("nickname");

    if(!nick.checkValidity()){

        if(nick.validity.valueMissing){
            error2(nick, "Has d'introduir un nick d'usuari!");
        }

        if(nick.validity.patternMismatch){
            error2(nick, "El nick d'usuari ha de contindre entre 2 i 6 caracters (A-Z||a-z||_) i començar per una lletra majúscula!")
        }

        return false;
    }
    esborraError();
    return true;
}

//Funció per validar la contrasenya de l'usuari
function validaPassword(){
    var pass1 = document.getElementById("password1");
    var pass2 = document.getElementById("password2");

    if(!pass1.checkValidity()){

        if(pass1.validity.valueMissing){
            error2(pass1, "Has d'introduir una contrasenya!");
        }

        if(pass1.validity.patternMismatch()){
            error2(pass1, "La contrasenya introduida no compleix els requeriments mínims establerts!");
        }

        return false;
    }

    //Comprovació de que les dos contrasenyes son iguals
    if(pass1.value != pass2.value){
        error2(pass1, "Les dos contrasenyes han de coincidir!");
        return false;
    }
    esborraError();
    return true;
}

//Funció per mostrar el camp de captcha
function mostraCaptcha(){
    //Captcha amb operació de suma
    var opSum = document.getElementById("operacioSum");
    var txt1 = document.createTextNode("Indica el resultat de la seguent operacio => " + rand1 + "+" + rand2 + " = ");
    opSum.appendChild(txt1);

    //Captcha amb operació de resta
    var opRest = document.getElementById("operacioRest");
    var txt2 = document.createTextNode("Indica el resultat de la seguent operacio => " + rand3 + "-" + rand4 + " = ");
    opRest.appendChild(txt2);
}

//Funcions per validar el captcha de l'usuari

//Validació amb operació de suma
function captcha1(){

    var solSum = document.getElementById("solucioSum");
    var sum = rand1 + rand2;

    if(!solSum.checkValidity()){
        if(solSum.validity.valueMissing){
            error2(solSum, "El camp està buit!");
        }

        return false;
    }

    if(parseInt(solSum.value) != sum){
        error2(solSum, "El resultat introduit no es el correcte!");
        return false;
    }

    esborraError();
    return true;
}

//Validació amb operació de resta
function captcha2(){

    var solRest = document.getElementById("solucioRest");
    var rest = rand3 - rand4;

    if(!solRest.checkValidity()){
        if(solRest.validity.valueMissing){
            error2(solRest, "El camp està buit!");
        }

        return false;
    }

    if(parseInt(solRest.value) != rest){
        error2(solRest, "El resultat introduit no es el correcte!");
        console.log(rest);
        return false;
    }

    esborraError();
    return true;
}