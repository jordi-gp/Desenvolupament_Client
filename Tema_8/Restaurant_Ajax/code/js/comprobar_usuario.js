//Comprovación de que el usuario esta logeado
function compruebaLog() {
    if (JSON.parse(localStorage.getItem("auth-token")) == null) {
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
                }
            })
            .then(response => response.json())
            .then(data => {
                //Nombre del usuario
                var nombreUsu = data.data.user.name;

                var nombre = document.createTextNode(nombreUsu);
                var info = document.getElementById("user");

                info.replaceChildren(nombre);

                //Imagen del usuario
                var imgAvatar = document.getElementById("avatar");

                if (data.data.user.avatar == null) {
                    imgAvatar.setAttribute("src", "../../img/profile-pic.png");
                } else {
                    imgAvatar.setAttribute("src", "https://userprofile.serverred.es/public/img/" + data.data.user.avatar);
                    if (document.getElementById("avatarAP") != null) {
                        document.getElementById("avatarAP").setAttribute("src", "https://userprofile.serverred.es/public/img/" + data.data.user.avatar);
                    }
                    compruebaLog();
                }

            })
    }
}