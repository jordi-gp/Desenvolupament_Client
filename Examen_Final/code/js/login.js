window.onload = main;

function main() {
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function getToken() {
    var email = document.getElementById("email");
    var contraseña = document.getElementById("password");

    var usuario = {
        "email": email.value,
        "password": contraseña.value
    }

    const api = "https://news.serverred.es/api/login"

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        if(data.error != null) {
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

function validaEmail() {
    var email = document.getElementById("email");

    if(!email.checkValidity()) {
        if(email.validity.valueMissing) {
            error2(email, "No s'ha introduit cap email");
        } else if(email.validity.patternMismatch) {
            error2(email, "El correu introduit no es correcte");
        }
        return false;
    }
    return true;
}

function validaContrasenya() {
    var contraseña = document.getElementById("password");

    if(!contraseña.checkValidity()) {
        if(contraseña.validity.valueMissing) {
            error2(contraseña, "S'ha d'introduir una contraseña");
        }
        return false;
    }
    return true;
}

function error2(element, missatge) {
    var msgError = document.createTextNode(missatge);
    var error = document.getElementById("missatgeError");

    error.replaceChildren(msgError);
    element.className = "error";
    element.focus();
}

function esborraError() {
    var formulario = document.forms[0];

    for (var i=0; i < formulario.elements.length -1 ; i++) {
        formulario.elements[i].className = "form-control";
    }

    var msgError = document.getElementById("missatgeError");
    var errorBorrat = document.createTextNode("");

    msgError.replaceChildren(errorBorrat);
}

function validar(e) {
    e.preventDefault();
    esborraError();

    if(validaEmail() && validaContrasenya()) {
        getToken();
        return true;
    } else {
        return false;
    }
}