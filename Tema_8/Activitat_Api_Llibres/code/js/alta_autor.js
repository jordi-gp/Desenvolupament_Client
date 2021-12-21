window.onload = main;

function main(){
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}


//Campo de las validaciones
//Validación del nombre del autor
function validaNomAutor(){
    var nomAut = document.getElementById("nom");

    if(!nomAut.checkValidity()){
        if(nomAut.validity.valueMissing){
            error2(nomAut, "No se puede dejar en blanco el campo del nombre del autor");
        } else if(nomAut.validity.patternMismatch){
            error2(nomAut, "El nombre del autor ha de contener como mínimo 3 caracteres");
        }
        return false;
    }
    //esborrarError();
    return true;
}

//Validación del campo de año de nacimiento
function validaAnyNaix(){
    var anyNaix = document.getElementById("anynaix");

    console.log(anyNaix.checkValidity());
    if(!anyNaix.checkValidity()){
        if(anyNaix.validity.valueMissing){
            error2(anyNaix, "Se debe indicar de forma obligatoria el año de nacimiento");
        } else if(anyNaix.validity.rangeUnderflow){
            error2(anyNaix, "El año de nacimiento no puede ser inferior a 1");
        } else if(anyNaix.validity.rangeOverflow){
            error2(anyNaix, "El año de nacimiento no puede ser superior a 2000");
        }
        return false;
    }
    //esborrarError();
    return true;
}

//Mostrado de errores en la validación
function error2(element, missatge){
    var error = document.getElementById("missatgeError");
    var msgError = document.createTextNode(missatge);

    error.appendChild(msgError);
    element.className = "error";
    element.focus();
}

//Borrado de errores en caso de validación
function esborrarError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.length; i++){
        formulari.elements[i].className = "";
    }

    var msgError = document.getElementById("missatgeError");
    var contMsgError = document.createTextNode("");

    msgError.replaceChildren(contMsgError);
}

//Validación de todos los campos del formulario
function validar(e){
    e.preventDefault();
    esborrarError();

    //Llamamiento de funciones de validación creadas
    if(validaNomAutor() && validaAnyNaix()){
        creaAutor();
        location.assign("../html/index.html");
        return true;
    } else {
        return false;
    }
}

//Función para crear un nuevo autor
function creaAutor(){
    const apiAutors = "https://www.serverred.es/api/autores";
    var nombreAutor = document.getElementById("nom").value;
    var añoAutor = document.getElementById("anynaix").value;

    var autor = {
        nombre: nombreAutor,
        año_nacimiento: añoAutor
    }

    fetch(apiAutors, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(autor),
    })
    .then(response => response.json())
    .catch((error) => {
        console.log("Error:", error)
    });
}
