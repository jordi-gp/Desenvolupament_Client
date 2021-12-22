window.onload = main;

function main(){
    carregaAutors();
    fetch(apiAutores)
    .then(response => response.json())
    .then(data_aux => {
        data_aux.resultado.forEach(element => {
            arrInfoAux.push(element);
        })
    })
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}

const apiLlibres = "https://www.serverred.es/api/libros";
const apiAutores = "https://www.serverred.es/api/autores";

var arrInfoAux = [];

//Función para cargar un nuevo libro una vez se han completado las validaciones
function creaLlibre(){
    var titol = document.getElementById("titol").value;
    var editorial = document.getElementById("editorial").value;
    var precio = document.getElementById("precio").value;
    var listaAutores = document.getElementById("autor");
    var idAutor;
    
    arrInfoAux.forEach(element => {
        if(listaAutores[listaAutores.selectedIndex].value == element.nombre){
            idAutor = element._id;
            return idAutor;
        }
    });

    var llibreNou = {
        titulo: titol,
        editorial: editorial,
        precio: precio,
        autor: idAutor
    }

    fetch(apiLlibres, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(llibreNou),
    })
    .then(response => response.json())
    .then(data => location.assign("../html/llistatLlibres.html"))
    .catch((error) => {
        console.log("Error:", error)
    })
}

/*******************
* APARTADO DE AJAX *
*******************/
//Carga de autores disponibles
function carregaAutors(){
    var url = "https://www.serverred.es/api/autores";
    var lista = document.getElementById("autor");

    fetch(url)
        .then(response => response.json())
        .then(data => data.resultado.forEach(element => {
            //console.log(element.nombre)
            var option = document.createElement("option");
            var texto = document.createTextNode(element.nombre);
            option.setAttribute("value", element.nombre);
            option.appendChild(texto);
            lista.appendChild(option);
        }))        
}

/***************************
* APARTADO DE VALIDACIONES *
***************************/
//Validación del formulario
function validar(e){
    e.preventDefault();
    esborrarError();

    if(validaTitulo() && validaEditorial() && validaPreu() && validaSelectAutor()){
        creaLlibre();
        return true;
    } else {
        return false;
    }
}

//Función para borrar los errores
function esborrarError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.length; i++){
        formulari.elements[i].className = "";
    }

    var msgError = document.getElementById("missatgeError");
    var contMsgError = document.createTextNode("");

    msgError.replaceChildren(contMsgError);
}

//Función para escribir el mensaje de error
function error2(element, missatge){
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

//Validaciones de los campos del formulario
//Validación del título seleccionado
function validaTitulo(){
    var titulo = document.getElementById("titol");

    if(!titulo.checkValidity()){
        if(titulo.validity.valueMissing){
            error2(titulo, "El campo de título no se puede dejar en blanco");
        } else if(titulo.validity.patternMismatch){
            error2(titulo, "El título ha de tener como mínimo 3 caracteres");
        }
        return false;
    }
    esborrarError();
    return true;
}

//Validación del editorial seleccionado
function validaEditorial(){
    var editorial = document.getElementById("editorial");
    
    if(!editorial.checkValidity()){
        if(editorial.validity.valueMissing){
            error2(editorial, "El campo de editorial no se puede dejar vacío");
        } else if(editorial.validity.patternMismatch){
            error2(editorial, "El campo de editorial ha de contener almenos 3 caracteres");
        }
        return false;
    }
    esborrarError();
    return true;
}

//Validación del precio seleccionado
function validaPreu(){
    var precio = document.getElementById("precio");

    if(precio.value == ""){
        error2(precio, "El campo de precio no se puede dejar en blaco");
        return false;
    } else if(precio.value <= 0){
        error2(precio, "El precio no puede ser 0 o un valor menor a 0");
        return false;
    } else {
        esborrarError();
        return true;
    }
}

//Validación del autor seleccionado
function validaSelectAutor(){
    var listaAutores = document.getElementById("autor");

    if(listaAutores[listaAutores.selectedIndex].value == ""){
        error2(listaAutores, "Has de seleccionar un autor");
        return false;
    } else {
        esborrarError();
        return true;
    }
}