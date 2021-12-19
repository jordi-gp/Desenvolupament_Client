window.onload = main;

function main(){
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}

//Objeto a cargar una vez realizadas las validaciones
/*var autorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    año_nacimiento: {
        type: Number,
        min: 0,
        max: 2000,
        trim: true
    }
})*/

//Campo de las validaciones
//Validación del nombre del autor
function validaNomAutor(){
    var nomAut = document.getElementById("nom");

    if(!nomAut.checkValidity()){
        if(nomAut.validity.valueMissing){
            error2(nomAut, "No se puede dejar en blanco el campo del nombre del autor");
        } else if(nomAut.validity.patternMismatch){
            erro2(nomAut, "El nombre del autor ha de contener como mínimo 3 caracteres");
        }
        return false;
    }
    esborrarError();
    return true;
}

// function validaNomAutor(){
//     var nomAut = document.getElementById("nom").value;

//     if(nomAut == ""){
//         error2(nomAut, "El campo de nom d'autor no pot estar buit");
//         return false;
//     } else {
//         console.log("S'ha introduit un nom");
//         console.log(nomAut);
//     }
// }

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
    esborrarError();

    //Llamamiento de funciones de validación creadas
    if(validaNomAutor()){
        return true;
    } else {
        e.preventDefault();
        return false;
    }
}