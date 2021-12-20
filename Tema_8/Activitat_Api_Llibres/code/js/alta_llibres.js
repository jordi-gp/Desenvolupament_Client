window.onload = main;

function main(){
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}

//Validación del formulario
function validar(e){
    esborrarError();

    if(validaTitulo() && validaEditorial()){
        console.log("oleee, s'ha validao el título mi pana");
        return true;
    } else {
        e.preventDefault();
        console.log("has fallado puto");
        return false;
    }
}

//Función para borrar los errores
function esborrarError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.length; i++){
        formulari.elements[i].className = "";
    }

    var msgError = document.getElementById("missatgeError");
    var contMsgError = document.createTextNode("");

    msgError.replaceChildren(contMsgError);
}

//Función para escribir el mensaje de error
function error2(element, missatge){
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

//Validaciones de los campos del formulario
function validaTitulo(){
    var titulo = document.getElementById("titol");

    if(!titulo.checkValidity()){
        if(titulo.validity.valueMissing){
            error2(titulo, "El campo del título no se puede dejar en blanco!");
        }else if(titulo.validity.patternMismatch){
            error2(titulo, "El título ha de contener como mínimo 3 caràcteres!");
        }
        return false;
    }
    esborrarError();
    return true;
}

function validaEditorial(){
    var editorial = document.getElementById("editorial");

    if(!editorial.checkValidity()){
        if(editorial.validity.valueMissing){
            error2(editorial, "El campo de editorial no se puede dejar en blanco!");
        } else if(editorial.validity.patternMismatch){
            error2(editorial, "El nombre de la editorial ha de tener como mínimo 3 caràceteres");
        }
        return false;
    }
    esborrarError();
    return true;
}