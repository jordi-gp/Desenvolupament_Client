window.onload = main;

function main() {
    document.getElementById("enviar").addEventListener("click", validar, false);
}

//Validación de los campos del formulario
//Validación del nombre de usuario
function validaNom() {
    var nombre = document.getElementById("nom");

    if(!nombre.checkValidity()) {
        if(nombre.validity.valueMissing) {
            error2(nombre, "No se puede dejar en blanco del campo del nombre");
        } else if(nombre.validity.patternMismatch) {
            error2(nombre, "El nombre introducido no es correcto");
        }
        return false;
    }
    return true;
}

//Validación del email del usuario
function validaEmail() {
    var email = document.getElementById("email");

    if(!email.checkValidity()) {
        if(email.validity.valueMissing) {
            error2(email, "No se puede dejar en blanco el campo del email");
        } else if(email.validity.patternMismatch) {
            error2(email, "El email introducido no es correcto");
        }
        return false;
    }
    return true;
}

//Añadimiento del nuevo usuario
function registraUsurio() {
    //Información obtenida del formulario
    var nom = document.getElementById("nom");
    var email = document.getElementById("email");
    var contraseña = document.getElementById("password");

    //Creación del objeto
    var usuario = {
        name: nom.value,
        email: email.value,
        password: contraseña.value,
        avatar: ""
    }

    //Subida del objeto a la API
    const apiUsuario = "https://userprofile.serverred.es/api/register";
    fetch(apiUsuario, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .catch((error) => {
        console.log("Ha ocurrido un error => ", error)
    })
}

//Validación de la contraseña del usuario
function validaContraseña() {
    var contraseña = document.getElementById("password");

    if(!contraseña.checkValidity()) {
        if(contraseña.validity.valueMissing) {
            error2(contraseña, "El campo de contraseña no se puede dejar en blanco");
        } else if(contraseña.validity.patternMismatch) {
            error2(contraseña, "El formato de la contraseña no es correcto");
        }
        return false;
    }
    return true;
}

//Validación de la contraseña repetida
function validaContraseñaRep() {
    var contraseñaRep = document.getElementById("passwordc");
    var contraseña = document.getElementById("password");

    if(!contraseñaRep.checkValidity()) {
        if(contraseñaRep.validity.valueMissing) {
            error2(contraseñaRep, "Se ha de repetir la contraseña introducida");
        } else if(contraseñaRep.validity.patternMismatch) {
            error2(contraseñaRep, "La contraseña introducida no es correcta");
        } else if(contraseñaRep.value != contraseña.value) {
            error2(contraseñaRep, "Las dos contraseñas han de coincidir");
        }
        return false;
    }
    return true;
}

//Validación del formulario
function validar(e) {
    e.preventDefault();
    esborrarError();

    if(validaNom() & validaEmail() && validaContraseña() && validaContraseñaRep()) {
        //registraUsurio();
        console.log(document.getElementById("passwordc").value)
        return true;
    } else {
        return false;
    }
}

//Errores del formulario
function error2(element, missatge) {
    var error = document.getElementById("missatgeError");
    var msgError = document.createTextNode(missatge);

    error.replaceChildren(msgError);
    element.className = "error";
    element.focus();
}

//Borrado de errores del formulario
function esborrarError() {
    var formulario = document.forms[0];

    for(var i=0; i < formulario.elements.length -1; i++) {
        formulario.elements[i].className = "form-control";
    }

    var msgError = document.getElementById("missatgeError");
    var contMsgError = document.createTextNode("");
    
    msgError.replaceChildren(contMsgError);
}