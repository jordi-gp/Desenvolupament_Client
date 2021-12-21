window.onload = main;

function main(){
    rellenaCampos();
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}

var modAutor;

//Funciones para editar los autores
//Obtención del usuario almacenado en localStorage
function getItem(){
    if(JSON.parse(localStorage.getItem("Autor")) != null){
        modAutor = JSON.parse(localStorage.getItem("Autor"));
        return modAutor;
    }
}

//Implementación de información obtenida del LocalStorage al formulario
function rellenaCampos(){
    getItem();

    var campoNombre = document.getElementById("nom");
    var campoAño = document.getElementById("anynaix");

    campoNombre.setAttribute("value", modAutor.nombre);
    campoAño.setAttribute("value", modAutor.año_nacimiento);

}

//Validaciones de los formularios
function error2(element, missatge){
    var error = document.getElementById("missatgeError");
    var msgError = document.createTextNode(missatge);

    error.appendChild(msgError);
    element.className = "error";
    element.focus();
}

//Borrado de los errores
function esborrarError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.length; i++){
        formulari.elements[i].className = "";
    }

    var msgError = document.getElementById("missatgeError");
    var contMsgError = document.createTextNode("");

    msgError.replaceChildren(contMsgError);
}

//Validación del formulario
function validar(e){
    e.preventDefault();
    esborrarError();

    if(validaNomAutor() && validaAnyNaix()){
        modificaAutor();
    } else {
        console.log("No s'ha validao shurmano");
    }
}

//Validación del campo nombre
function validaNomAutor(){
    var nomAut = document.getElementById("nom");

    if(!nomAut.checkValidity()){
        if(nomAut.validity.valueMissing){
            error2(nomAut, "El campo nombre no se puede dejar vacío");
        } else if(nomAut.validity.patternMismatch){
            error2(nomAut, "El nombre ha de contener como mínimo 3 caracteres, y no se admiten los especiales!");
        }
        return false;
    }
    return true;
}

//Validación del campo año de nacimiento
function validaAnyNaix(){
    var anyNaix = document.getElementById("anynaix");

    if(!anyNaix.checkValidity()){
        if(anyNaix.validity.valueMissing){
            error2(anyNaix, "El campo de fecha de nacimiento no puede estar vacio");
        } else if(anyNaix.validity.rangeUnderflow){
            error2(anyNaix, "El año de nacimiento no puede ser inferior a 0");
        } else if(anyNaix.validaAnyNaix.rangeOverflow){
            error2(anyNaix, "El año de nacimiento no puede ser superior a 2000");
        }
        return false;
    }
    return true;
}

//Función para realizar la modificación del autor seleccionado
function modificaAutor(){
    var idAut = modAutor.id;
    const apiAutors = "https://serverred.es/api/autores/"+idAut;

    var newAutor = {
        nombre: document.getElementById("nom").value,
        año_nacimiento: document.getElementById("anynaix").value
    }

    fetch(apiAutors, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newAutor)
    })
    .then(response => response.json())
    .catch((error) => {
        console.log("Error => ", error);
    });
}