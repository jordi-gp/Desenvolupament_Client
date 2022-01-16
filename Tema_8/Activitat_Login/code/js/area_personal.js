window.onload = main;

function main() {
    compruebaLog();
    infoForm();
    document.getElementById("enviarAvatar").addEventListener("click", cambiaAvatar);
}

const api = "https://userprofile.serverred.es/api/areapersonal";

//Comprovación de que el usuario esta logeado
function compruebaLog() {
    if(JSON.parse(localStorage.getItem("auth-token")) == null) {
        location.assign("../html/login.html");
    } else {
        var auth_token = JSON.parse(localStorage.getItem("auth-token"));

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

            imgAvatar.setAttribute("src", "../../img/profile-pic.png")
            avatar.setAttribute("src", "../../img/profile-pic.png");
        })
    }
}

//Función para cambiar el avatar del usuario
function cambiaAvatar(e) {
    if(JSON.parse(localStorage.getItem("auth-token")) != null) {
        var token = JSON.parse(localStorage.getItem("auth-token"));
    }

    const formData = new formData();
    const img = document.querySelector("input[type='file']");

    formData.append("avatar", img.files[0]);

    fetch(api, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "auth-token": token.token
        },
        body: formData
    })
    .then(response => response.json())
    .catch(error => {
        console.log("Error => ", error);
    })
}

function infoForm() {
    var formulari = document.forms[0];

    for(var i=1; i < formulari.elements.length - 1; i++) {
        formulari.elements[i].setAttribute("value", "");
    }
}
