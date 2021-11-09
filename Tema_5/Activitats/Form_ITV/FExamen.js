window.onload = main;

function main(){
    afigEvent();
    afigEvent2();
    validaEstacio();
    document.getElementById("Enviar").addEventListener("click", validar, false);
}

//CAMP D'ESTACIÓ D'ITV
function afigEvent(){
    var radButtons = document.getElementsByName("provincia");

    for(var i=0; i < radButtons.length; i++){
        radButtons[i].addEventListener("change", mostraEstacions);
    }
}

function afigEvent2(){
    var radButtons = document.getElementsByName("provincia");

    for(var i=0; i < radButtons.length; i++){
        radButtons[i].addEventListener("change", validaEstacio);
    }
}

function mostraEstacions(){
    var radButtons = document.getElementsByName("provincia");
    var sel = document.getElementById("estacio");
    
    do {
        sel.lastChild.parentNode.removeChild(sel.lastChild);
    } while(sel.lastChild != null);

    radButtons.forEach((element, index) => {
        if(element.checked){
            for(var i=0; i < estacions[index].estacio.length; i++){
                var op = document.createElement("option");
                var txt = document.createTextNode(estacions[index].estacio[i]);

                op.appendChild(txt);
                op.setAttribute("id", i);
                sel.appendChild(op);
            }
        }
    });
}

//CAMP DE VALIDACIÓ DE PROVÍNCIA I ESTACIÓ
function validaEstacio(){
    var estacio = document.getElementsByName("provincia");

    for(var i=0; i < estacio.length; i++){
        if(estacio[i].checked == true){
            console.log(estacio[i].value);
        } else {
            console.log("Has de seleccionar una estació");
        }
    }
}

//CAMP DE VALIDACIÓ DE MATRICULA
function validaMatricula(){
    var matrVal = document.getElementById("matricula");

    if(!matrVal.checkValidity()){
        if(matrVal.validity.valueMissing){
            error2(matrVal, "Aquest camp no pot estar buit!");
        }
        if(matrVal.validity.patternMismatch){
            error2(matrVal, "El valor introduït no es correcte!");
        }
        return false;
    }
    esborrarError();
    return true;

}

//CAMP DE VALIDACIÓ DEL TIPUS DE COMBUSTIBLE
function validaCombustible(){
    var combus = document.getElementById("combustible");

    if(combus[combus.selectedIndex].value == "Selecciona una opció"){
        error2(combus, "Has de seleccionar un tipus de combustible almenys!");
        return false;
    }
    return true;
}

//CAMP DE VALIDACIÓ DE LES DADES PERSONALS
function validaNom(){
    var nom = document.getElementById("nom");

    if(!nom.checkValidity()){
        if(nom.validity.valueMissing){
            error2(nom, "Aquest camp ha d'estar emplenat de forma obligatòria!");
        }
        if(nom.validity.patternMismatch){
            error2(nom, "El nom introduit no es correcte!");
        }
        return false;
    }
    return true;
}

function validaTelefon(){
    var telefon = document.getElementById("telefon");

    if(!telefon.checkValidity()){
        if(telefon.validity.valueMissing){
            error2(telefon, "Aquest camp ha de ser emplenat de forma obligatòria!");
        }
        if(telefon.validity.patternMismatch){
            error2(telefon, "El número de telèfon introduït no es correcte!");
        }
        return false;
    }
    return true;
}

function validaEmail(){
    var email = document.getElementById("email");

    if(!email.checkValidity()){
        if(email.validity.valueMissing){
            error2(email, "Aquest camp ha d'estar emplenat de forma obligatòria!");
        }
        if(email.validity.patternMismatch){
            error2(email, "El email introduït no es correcte!");
        }
    }
}

//VALIDACIÓ TERMES I CONDICIONS
function validaTermCond(){
    var accept = document.getElementById("protecioDades");

    if(accept.checked == true){
        //return true
    } else {
        //return false
    }
}

//CAMP DELS ERRORS
function error2(element, missatge){
    var error = document.getElementById("missatgeError");
    var errCont = document.createTextNode(missatge);

    error.appendChild(errCont);
    element.className = "error";
    element.focus();
}

function esborrarError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length; i++){
        formulari.elements[i].className = "";
    }

    var msgError = document.getElementById("missatgeError");
    var contMsgErr = document.createTextNode("");

    msgError.replaceChildren(contMsgErr);
}

//CAMP DE VALIDACIÓ
function validar(e){
    esborrarError();

    if(validaMatricula() && validaCombustible() && confirm("Desitges realitzar la reserva?")){
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

