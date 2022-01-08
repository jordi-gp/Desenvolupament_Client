window.onload = main;

function main() {
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}

//Validaciónd del formulario
//Validación del nombre del usuario
function validaNomUsuari() {
    var nombreUsuario = document.getElementById("nom");

    if(!nombreUsuario.checkValidity()) {
        if(nombreUsuario.validity.valueMissing) {
            error2(nombreUsuario, "S'ha d'indicar el nom de l'usuari");
        } else if(nombreUsuario.validity.patternMismatch) {
            error2(nombreUsuario, "El nom ha de tindre un format correcte");
        }
        return false;
    }
    return true;
}

//Validación del número de teléfono del usuario
function validaTelefon() {
    var telUsuario = document.getElementById("telefon");

    if(!telUsuario.checkValidity()) {
        if(telUsuario.validity.valueMissing) {
            error2(telUsuario, "S'ha d'indicar el teléfon del usuari");
        } else if(telUsuario.validity.patternMismatch) {
            error2(telUsuario, "El teléfon introduit ha de tindre un format correcte");
        }
        return false;
    }
    return true;
}

//Validación del correo electrónico del usuario
function validaEmail() {
    var emailUsuario = document.getElementById("email");

    if(!emailUsuario.checkValidity()) {
        if(emailUsuario.validity.valueMissing) {
            error2(emailUsuario, "S'ha d'indicar el correu de l'usuari");
        } else if(emailUsuario.validaEmail.patternMismatch) {
            error2(emailUsuario, "El correu electrónic ha de tindre un format correcte");
        }
        return false;
    }
    return true;
}

//Validación de la dirección del usuario
function validaDireccio() {
    var direccionUsuario = document.getElementById("direccion");

    if(!direccionUsuario.checkValidity()) {
        if(direccionUsuario.validity.valueMissing) {
            error2(direccionUsuario, "S'ha d'indicar la dirreció de l'usuari");
        } else if(direccionUsuario.validity.patternMismatch) {
            error2(direccionUsuario, "La direcció introduïda no es correcta");
        }
        return false;
    }
    return true;
}

//Función para mostrar el error
function error2(element, missatge) {
    var error = document.getElementById("missatgeError");
    var msgError = document.createTextNode(missatge);

    error.appendChild(msgError);
    element.className = "error";
    element.focus();
}

//Función para borrar los errores del formulario
function esborrarError() {
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length; i++) {
        formulari.elements[i].className = "";
    }

    var msgError = document.getElementById("missatgeError");
    var contMsgError = document.createTextNode("");

    msgError.replaceChildren(contMsgError);
}

//TODO: Función para validar el formulario
function validar(e) {
    e.preventDefault();
    esborrarError();

    if(validaNomUsuari() && validaTelefon() && validaEmail() && validaDireccio()){
        afigUsuari();
        return true;
    } else {
        return false;
    }
}

//Añadido del nuevo usuario a la API
function afigUsuari() {
    const apiUsuarios = "https://serverred.es/api/usuarios";

    //Información del usuario
    var nomUsuario = document.getElementById("nom");
    var telUsuario = document.getElementById("telefon");
    var emailUsuario = document.getElementById("email");
    var direccioUsuario = document.getElementById("direccion");

    //Objeto a subir
    var usuario = {
        nombre: nomUsuario.value,
        telefono: telUsuario.value,
        email: emailUsuario.value,
        direccion: direccioUsuario.value
    }

    //Subida del objeto a la API
    fetch(apiUsuarios, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => location.assign("../html/reservarUsuari.html"))
    .catch((error) => {
        console.log("Error => ", error)
    })
}