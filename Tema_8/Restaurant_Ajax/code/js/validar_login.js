window.onload = main;

function main() {
    document.getElementById("enviar").addEventListener("click", validar, false);
}

//Validación del email introducido
function validaEmail() {
    var email = document.getElementById("email");

    if (!email.checkValidity()) {
        if (email.validity.valueMissing) {
            error2(email, "No se ha introducido ningún email");
        } else if (email.validity.patternMismatch) {
            error2(email, "El email introducido no es correcto");
        }
        return false;
    }
    return true;
}

//Validación de la contraseña introducida
function validaContraseña() {
    var contraseña = document.getElementById("password");

    if (!contraseña.checkValidity()) {
        if (contraseña.validity.valueMissing) {
            error2(contraseña, "No se ha introducido ninguna contraseña");
        } else if (contraseña.validity.patternMismatch) {
            error2(contraseña, "La contraseña introducida no es correcta");
        }
        return false;
    }
    return true;
}

//Recolección del token en caso de ser correcto la información
//TODO: recoger el token de acceso del usuario
function getToken() {
    var email = document.getElementById("email");
    var contraseña = document.getElementById("password");

    var usuario = {
        "email": email.value,
        "password": contraseña.value
    }

    //Consulta en la api
    const apiLogin = "https://userprofile.serverred.es/api/login";

    fetch(apiLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error != null) {
                var msgError = document.createTextNode(data.error);
                var error = document.getElementById("missatgeError");

                error.appendChild(msgError);
            } else {
                var token = {
                    "token": data.data.token
                }

                localStorage.setItem("auth-token", JSON.stringify(token));
                location.assign("../html/index.html");
            }
        })
}

//Possible error producido en el formulario
function error2(element, missatge) {
    var msgError = document.createTextNode(missatge);
    var error = document.getElementById("missatgeError");

    error.replaceChildren(msgError);
    element.className = "error";
    element.focus();
}

//Borrado de errores del formulario
function esborrarError() {
    var formulario = document.forms[0];

    for (var i = 0; i < formulario.elements.length - 1; i++) {
        formulario.elements[i].className = "form-control";
    }

    var msgError = document.getElementById("missatgeError");
    var errorBorrat = document.createTextNode("");

    msgError.replaceChildren(errorBorrat);
}

//Validación del formulario
function validar(e) {
    e.preventDefault();
    esborrarError();

    if (validaEmail() && validaContraseña()) {
        getToken();
        return true;
    } else {
        return false;
    }

}