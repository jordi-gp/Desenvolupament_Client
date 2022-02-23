window.onload = main;

function main() {
    mostraNom();
    llistasNoticies();
}

const api = "https://news.serverred.es/api/articles";
const token = JSON.parse(localStorage.getItem("auth-token"));

function mostraNom() {
    var auth_token = JSON.parse(localStorage.getItem("auth-token"));
    const api = "https://news.serverred.es/api/areapersonal";

    fetch(api, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": auth_token.token
            }
        })
        .then(response => response.json())
        .then(data => {
            var nombreUsu = data.data.user.name;

            var nombre = document.createTextNode(nombreUsu);
            var info = document.getElementById("user");

            info.replaceChildren(nombre);

            //Imagen del usuario
            var imgAvatar = document.getElementById("avatar");

            if (data.data.user.avatar == null) {
                imgAvatar.setAttribute("src", "../img/profile-pic.png");
            }
        })
}

function llistasNoticies() {
    fetch(api, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token.token
        }
    })
    .then(response => response.json())
    .then(data => data.resultado.forEach(element => {
        console.log(element)
        afig(element);
    }));
}

function afig(element) {
    var div1 = document.createElement("div");
    div1.setAttribute("class", "card mb-2");
    div1.style.width = "40rem";

    var div2 = document.createElement("div");
    div2.setAttribute("class", "card-body");

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "card-title");
    var valH5 = document.createTextNode(element.title)
    h5.appendChild(valH5);

    var p = document.createElement("p");
    p.setAttribute("class", "card-text");

    var valP = document.createTextNode(element.body);
    p.appendChild(valP);

    div2.appendChild(h5);
    div2.appendChild(p);

    div1.appendChild(div2);

    var div3 = document.createElement("div");
    div3.setAttribute("class", "card-body");

    var span1 = document.createElement("span");
    var span2 = document.createElement("span");
    var span3 = document.createElement("span");
    var span4 = document.createElement("span");
    var span5 = document.createElement("span");
    var span6 = document.createElement("span");
    var span7 = document.createElement("span");

    var valSpan1 = document.createTextNode(element.voteScore);
    span1.innerHTML = '<i class="bi bi-star-fill"></i>';
    span1.appendChild(valSpan1);

    var valSpan2 = document.createTextNode(element.category);
    span2.innerHTML = '<i class="bi bi-tag"></i>';
    span2.appendChild(valSpan2);
    
    var valSpan3 = document.createTextNode(element.author);
    span3.innerHTML = '<i class="bi bi-person-fill"></i>';
    span3.appendChild(valSpan3);

    var valSpan4 = document.createTextNode(element.timestamp);
    span4.innerHTML = '<i class="bi bi-calendar-event"></i>';
    span4.appendChild(valSpan4);

    var a1 = document.createElement("a");
    a1.setAttribute("class", "text-decoration-none");
    a1.innerHTML = '<i class="bi bi-emoji-smile"></i>';
    span5.appendChild(a1);

    var a2 = document.createElement("a");
    a2.setAttribute("class", "text-decoration-none");
    a2.innerHTML = '<i class="bi bi-emoji-angry"></i>';
    span6.appendChild(a2);

    var a3 = document.createElement("a");
    a3.setAttribute("id", element._id);
    a3.setAttribute("class", "text-decoration-none");
    a3.innerHTML = '<i class="bi bi-trash"></i>';
    var valA3 = document.createTextNode("Eliminar");
    a3.appendChild(valA3);
    span7.appendChild(a3);

    div3.appendChild(span1);
    div3.appendChild(span2);
    div3.appendChild(span3);
    div3.appendChild(span4);
    div3.appendChild(span5);
    div3.appendChild(span6);
    div3.appendChild(span7);
    div1.appendChild(div3);

    document.getElementById("root").appendChild(div1);
}