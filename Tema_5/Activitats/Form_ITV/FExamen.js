window.onload = main;

function main(){
    afigEvent();
    mostraHores();
    validaData();
    document.querySelector("input[type='date']").addEventListener("change", validaData);
    document.getElementById("Enviar").addEventListener("click", validar, false);
}

//CAMP D'ESTACIÓ D'ITV
function afigEvent(){
    var radButtons = document.getElementsByName("provincia");

    for(var i=0; i < radButtons.length; i++){
        radButtons[i].addEventListener("change", mostraEstacions);
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
    var estacio = document.getElementById("estacio");

        if(estacio[estacio.selectedIndex].value == "Selecciona una opció"){
            error2(estacio, "Has de seleccionar una estació!");
            return false;
        }
    esborrarError();
    return true;
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
    //esborrarError();
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

//MOSTRAR LA DATA QUE ES POT SELECCIONAR
function mostraHores(){
    var selHora = document.getElementById("hora");
    
    for(var i=7; i < 20; i++){
        for(var j=0; j < 60; j+=15){
            var mostraI = i;
            var mostraJ = j;

            if(i < 10){
                mostraI = "0"+i;
            }

            if(j == 0){
                mostraJ = j+"0";
            }
            
            var opHora = document.createElement("option");
            var horaVal = document.createTextNode(mostraI+":"+mostraJ);

            opHora.appendChild(horaVal);
            selHora.appendChild(opHora);
        }
    }
}

//CAMP DE VALIDACIÓ DE L'HORA
function validaHores(){
    var horaSel = document.getElementById("hora");

    if(horaSel[horaSel.selectedIndex].value == "00:00"){
        error2(horaSel, "Has de seleccionar un hora correcta!");
        return false;
    }
    return true;
}

//CAMP DE VALIDACIÓ DE LA DATA
function validaData(){
    var temps = document.querySelector("input[type='date']");

    var data = new Date(temps.value);

    console.log(temps.value);
    console.log(data.getDate());


}

//CAMP DE VALIDACIÓ DE LES DADES PERSONALS
function validaNom(){
    var nom = document.getElementById("nom");

    if(!nom.checkValidity()){
        if(nom.validity.valueMissing){
            error2(nom, "El camp del nom i cognoms no pot estar buit!");
        }
        if(nom.validity.patternMismatch){
            error2(nom, "El nom i cognoms introduits no es correcte!");
        }
        return false;
    }
    return true;
}

function validaTelefon(){
    var telefon = document.getElementById("telefon");

    if(!telefon.checkValidity()){
        if(telefon.validity.valueMissing){
            error2(telefon, "El camp del telèfon no pot estar buit!");
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
            error2(email, "El camp del correu electrònic no pot estar buit!");
        }
        if(email.validity.patternMismatch){
            error2(email, "El email introduït no es correcte!");
        }
    }
    return true;
}

//VALIDACIÓ TERMES I CONDICIONS
function validaTermCond(){
    var accept = document.getElementById("protecioDades");

    if(!accept.checkValidity()){
        if(accept.checked != true){
            error2(accept, "Has d'acceptar els termes i condicions!");
        }
        return false;
    }
    return true;
}

//CAMP DELS ERRORS
function error2(element, missatge){
    var error = document.getElementById("missatgeError");
    var errCont = document.createTextNode(missatge);

    error.appendChild(errCont);
    element.className = "error";
    location.href = "#miModal";
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

    if(/*validaMatricula() && validaCombustible() && validaNom() && validaTelefon() &&*/ validaHores() && confirm("Desitges realitzar la reserva?")){
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

