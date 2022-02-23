window.onload = main;

function main() {
    document.getElementById("enviar").addEventListener("click", validar, false);
}

function registraUsu() {
    var nom = document.getElementById("nom");
    var email = document.getElementById("email");
    var contraseña = document.getElementById("password");

    var usuario = {
        name: nom.value,
        email: email.value,
        password: contraseña.value
    }

    const apiUsuari = "https://news.serverred.es/api/register";

    fetch(apiUsuari, {
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
            location.assign("../html/index.html");
        }
    })
    .catch((error) => {
        console.log("Ha ocorregut un error =>", error);
    })
}

function validaNom() {
    var nom = document.getElementById("nom");

    if(!nom.checkValidity()) {
        if(nom.validity.valueMissing) {
            error2(nom, "S'ha d'introduir el nom");
        }
        return false;
    }
    return true;
}

function validaEmail() {
    var email = document.getElementById("email");

    if(!email.checkValidity()) {
        if(email.validity.valueMissing) {
            error2(email, "No s'ha introduit cap email");
        }
        return false;
    }
    return true;
}

function validaContrasenya() {
    var contraseña = document.getElementById("password");
    contraseñaRep = document.getElementById("passwordc");

    if(!contraseña.checkValidity()) {
        if(contraseña.validity.valueMissing) {
            error2(contraseña, "S'ha d'introduir una contraseña");
        }
        return false;
    }

    if(contraseña.value != contraseñaRep.value) {
        error2(contraseñaRep, "Les contraseñes han de coincidir");
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

    if(validaNom() && validaEmail() && validaContrasenya()) {
        registraUsu();
        return true;
    } else {
        return false;
    }
}