window.onload = main;

function main() {
    compruebaLog();
    getCategoria();
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}

const token = JSON.parse(localStorage.getItem("auth-token"));

const apiCategoria = "https://news.serverred.es/api/categories"

function addCategoria() {
    var nombre = document.getElementById("nom");
    
    var newCategoria = {
        name: nombre.value,
        path: nombre.value
    }

    fetch(apiCategoria, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": token.token
        },
        body: JSON.stringify(newCategoria)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("nom").value = "";
        var li = document.createElement("li");
            li.setAttribute("class", "list-group-item");
            li.setAttribute("id", data.resultado._id);

            var valCat = document.createTextNode(data.resultado.name);
            li.appendChild(valCat);

            document.getElementById("listCategory").appendChild(li);
    })
}

function validaNom() {
    var nom = document.getElementById("nom");

    if(!nom.checkValidity()) {
        if(nom.validity.valueMissing) {
            error2(nom, "La categoria ha de tindre un nom");
        } else if(nom.validity.patternMismatch) {
            error2(nom, "La categoria ha de tindre almenys 4 caracters");
        }
        return false;
    }
    return true;
}

function validar(e) {
    e.preventDefault();
    esborraError();

    if(validaNom()) {
        addCategoria();
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

async function getCategoria() {
    await fetch(apiCategoria, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        data.resultado.sort();
        data.resultado.forEach(element => {
            var li = document.createElement("li");
            li.setAttribute("class", "list-group-item");
            li.setAttribute("id", element._id);

            var valCat = document.createTextNode(element.name);
            li.appendChild(valCat);

            document.getElementById("listCategory").appendChild(li);
        });
    })
}