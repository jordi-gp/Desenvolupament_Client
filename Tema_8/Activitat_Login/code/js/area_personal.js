window.onload = main;

function main() {
    compruebaLog();
    infoUsu();
    infoForm();
    document.getElementById("enviarAvatar").addEventListener("click", cambiaAvatar);
}

const api = "https://userprofile.serverred.es/api/areapersonal";
const apiAvatar = "https://userprofile.serverred.es/api/areapersonal/avatar";

//Comprovación de que el usuario esta logeado
function infoUsu() {
    //Token del usuario
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
        console.log(data)
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


//Función para cambiar el avatar del usuario
function cambiaAvatar(e) {
    e.preventDefault();

    if(JSON.parse(localStorage.getItem("auth-token")) != null) {
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

    for(var i=1; i < formulari.elements.length - 1; i++) {
        formulari.elements[i].setAttribute("value", "");
    }
}
