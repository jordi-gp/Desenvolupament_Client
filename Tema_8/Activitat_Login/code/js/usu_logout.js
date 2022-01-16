window.onload = main;

function main() {
    compruebaLog();
    document.getElementById("enviar").addEventListener("click", cerrarSesion);
}

function compruebaLog() {
    if(JSON.parse(localStorage.getItem("auth-token")) == null) {
        location.assign("../html/login.html");
    } else {
        var auth_token = JSON.parse(localStorage.getItem("auth-token"));

        //Obtención de la información almacenada en la API
        const api = "https://userprofile.serverred.es/api/areapersonal";

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

function cerrarSesion() {
    localStorage.removeItem("auth-token");
    compruebaLog();
}