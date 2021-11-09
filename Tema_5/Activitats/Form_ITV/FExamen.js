window.onload = main;

function main(){
    //mostraEstacions();
    afigEvent();
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

    if(validaMatricula() && confirm("Desitges realitzar la reserva?")){
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}

