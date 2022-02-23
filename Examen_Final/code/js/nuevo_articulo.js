window.onload = main;

function main() {
    compruebaLog();
    listaCategoria();
    document.getElementById("crearArticulo").addEventListener("click", validar, false);
}

const token = JSON.parse(localStorage.getItem("auth-token"));
const apiCategoria = "https://news.serverred.es/api/categories"

function listaCategoria() {
    fetch(apiCategoria, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token.token
        }
    })
    .then(response => response.json())
    .then(data => data.resultado.forEach(element => {
        var option = document.createElement("option");
        var optionVal = document.createTextNode(element.name);

        option.appendChild(optionVal);

        document.getElementById("categories").appendChild(option)
    }));
}

function afigNoticia() {
    const api = "https://news.serverred.es/api/articles";

    var article = {
        title: document.getElementById("title").value,
        body: document.getElementById("body").value,
        voteScore: 0,
        author: document.getElementById("author").value,
        category: document.getElementById("categories").value
    }

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token.token
        },
        body: JSON.stringify(article)
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

function validaTitol() {
    var titol = document.getElementById("title");

    if(!titol.checkValidity()) {
        if(titol.validity.valueMissing) {
            error2(titol, "S'ha d'introduir un titol");
        } else  if(titol.validity.patternMismatch) {
            error2(titol, "El titol introduit no es valid")
        }
        return false;
    }
    return true;
}

function validaAutor() {
    var autor = document.getElementById("author");

    if(!autor.checkValidity()) {
        if(autor.validity.valueMissing) {
            error2(autor, "S'ha d'introduir un autor");
        } else  if(autor.validity.patternMismatch) {
            error2(autor, "L'autor introduit no es valid")
        }
        return false;
    }
    return true;
}

function validaCos() {
    var cosNot = document.getElementById("body");

    if(cosNot.value.length < 20) {
        error2(cosNot, "La notícia ha de contindre almenys 20 caracters");
        return false;
    }
    return true;
}

function validaCategoria() {
    var list = document.getElementById("categories");

    if(list.value != "Choose...") {
        return true;
    } else {
        error2(list, "S'ha de seleccionar una categoria");
        return false;
    }
}

function validar(e) {
    e.preventDefault();
    esborraError();

    if(validaTitol() && validaAutor() && validaCategoria() && validaCos()) {
        afigNoticia();
        return true;
    } else {
        return false;
    }
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