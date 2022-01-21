window.onload = main;

function main() {
    compruebaLog();
    infoUsu();
    infoForm();
    document.getElementById("enviar").addEventListener("click", validar, false);
    document.getElementById("enviarAvatar").addEventListener("click", cambiaAvatar);
}

const api = "https://userprofile.serverred.es/api/areapersonal";
const apiAvatar = "https://userprofile.serverred.es/api/areapersonal/avatar";

//Token del usuario
var auth_token = JSON.parse(localStorage.getItem("auth-token"));

//Comprovación de que el usuario esta logeado
function infoUsu() {
    //Obtención de la información almacenada en la API
    fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": auth_token.token
            },
        })
        .then(response => response.json())
        .then(data => {
            //Nombre del usuario
            var nombreUsu = data.data.user.name;

            var nombre = document.createTextNode(nombreUsu);
            var info = document.getElementById("user");
            var nom = document.getElementById("nom");

            info.replaceChildren(nombre);
            nom.setAttribute("value", nombreUsu);

            //Imagen del usuario
            var imgAvatar = document.getElementById("avatar");
            var avatar = document.getElementById("avatarAP");

            if (data.data.user.avatar == null) {
                imgAvatar.setAttribute("src", "../../img/profile-pic.png")
                avatar.setAttribute("src", "../../img/profile-pic.png");
            } else {
                imgAvatar.setAttribute("src", "https://userprofile.serverred.es/public/img/" + data.data.user.avatar);
                avatar.setAttribute("src", "https://userprofile.serverred.es/public/img/" + data.data.user.avatar);
            }
            compruebaLog();
        })
}


//Función para cambiar el avatar del usuario
function cambiaAvatar(e) {
    e.preventDefault();

    if (JSON.parse(localStorage.getItem("auth-token")) != null) {
        var token = JSON.parse(localStorage.getItem("auth-token"));
    }

    var nom = document.getElementById("nom").value;

    const formData = new FormData();
    const img = document.querySelector("input[type='file']");

    formData.append("avatar", img.files[0]);


    fetch(apiAvatar, {
            method: "PUT",
            headers: {
                "auth-token": token.token
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            console.log("Error => ", error);
        })
}

function infoForm() {
    var formulari = document.forms[0];

    for (var i = 1; i < formulari.elements.length - 1; i++) {
        formulari.elements[i].setAttribute("value", "");
    }
}

//Validación de los campos del formulario
function validaNom() {
    var nombre = document.getElementById("nom");

    if (!nombre.checkValidity()) {
        if (nombre.validity.valueMissing) {
            error2(nombre, "El nombre no se puede dejar en blanco");
        } else if (nombre.validity.patternMismatch) {
            error2(nombre, "El nombre introducido no es correcto");
        }
        return false;
    }
    return true;
}

function validaCotnraseñaAct() {
    var contraseñaAct = document.getElementById("passworda");

    if (!contraseñaAct.checkValidity()) {
        if (contraseñaAct.validity.valueMissing) {
            error2(contraseñaAct, "El campo de contraseña no se puede dejar en blanco");
        } else if (contraseñaAct.validity.patternMismatch) {
            error2(contraseñaAct, "La contraseña introducida no es correcta");
        }
        return false;
    }
    return true;
}

function validaContraseñaNova() {
    var contraseña = document.getElementById("password");
    var contraseñaRep = document.getElementById("passwordc");

    if (!contraseña.checkValidity()) {
        if (contraseña.validity.valueMissing) {
            error2(contraseña, "No se puede dejar en blanco el campo contraseña");
        } else if (contraseña.validity.patternMismatch) {
            error2(contraseña, "La contraseña introducida no es correcta");
        }
        return false;
    }
    if (contraseña.value != contraseñaRep.value) {
        error2(contraseñaRep, "Las dos contrasenyas han de coincidir");
        return false;
    }
    return true;
}

//Actualización de la información del usuario
function actualizaPerfil() {
    //Información del usuario
    var nombre = document.getElementById("nom").value;
    var contraseñaAct = document.getElementById("passworda").value;
    var contraseña = document.getElementById("password").value;

    //Objeto usuario
    var usuarioActualizado = {
        "name": nombre,
        "password": contraseñaAct,
        "newPassword": contraseña
    }

    console.log(usuarioActualizado);
    console.log(auth_token.token)

    fetch(api, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": auth_token.token
            },
            body: JSON.stringify(usuarioActualizado)
        })
        .then(response => response.json())
        .then(data => {
            var error = document.getElementById("missatgeError");

            if (data.error != null) {
                var msgError = document.createTextNode(data.error);
                error.replaceChildren(msgError);
            } else {
                var msgConfirm = document.createTextNode("Contraseña actualizada con éxito");
                error.replaceChildren(msgConfirm);
            }
        })
        .catch((error) => {
            console.log("Ha ocurrido un error => ", error);
        })
}

//Validación del formulario
function validar(e) {
    e.preventDefault();
    esborrarError();

    //TODO: validación de los campos
    if (validaNom() && validaCotnraseñaAct() && validaContraseñaNova()) {
        actualizaPerfil();
        return true;
    } else {
        return false;
    }
}

//Error a mostrar
function error2(element, missatge) {
    var error = document.getElementById("missatgeError");
    var msgError = document.createTextNode(missatge);

    error.replaceChildren(msgError);
    element.className = "error";
    element.focus();
}

//Borrado de errores
function esborrarError() {
    var formulario = document.forms[0];

    for (var i = 0; i < formulario.elements.length - 1; i++) {
        formulario.elements[i].className = "form-control";
    }

    var error = document.getElementById("missatgeError");
    var msgError = document.createTextNode("");

    error.replaceChildren(msgError);
}