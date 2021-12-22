window.onload = main; 

function main(){
    obtenirAutor();
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}

var modLlibre;
var nomAutor;
var idAutor;
var arrayAutors = [];
var arrayIdAutors = [];

//Obtención del libro almacenado en localStorage
function getItem(){
    if(JSON.parse(localStorage.getItem("Llibre")) != null){
        modLlibre = JSON.parse(localStorage.getItem("Llibre"));
        return modLlibre;
    }
}

function obtenirAutor(){
    getItem();
    const apiAutores = "https://serverred.es/api/autores";

    fetch(apiAutores)
    .then(response => response.json())
    .then(data => data.resultado.forEach(element => {
        if(modLlibre.autor == element._id){
            nomAutor = element.nombre;
            idAutor = element._id;
        }
        arrayIdAutors.push(element._id);
        arrayAutors.push(element.nombre);

    }))
    .then(rellenaCampos)
}

function rellenaCampos(){
    var titol = document.getElementById("titol");
    var editorial = document.getElementById("editorial");
    var precio = document.getElementById("precio");

    titol.setAttribute("value", modLlibre.titulo);
    editorial.setAttribute("value", modLlibre.editorial);
    precio.setAttribute("value", modLlibre.precio);


    //Añadido de autores a la lista de opciones
    var lista = document.getElementById("autor");

    for(var i=0; i < arrayIdAutors.length; i++){
        var option = document.createElement("option");
        var valOption = document.createTextNode(arrayAutors[i]);

        option.setAttribute("value", arrayAutors[i]);
        option.setAttribute("id", arrayIdAutors[i]);
        option.appendChild(valOption);
        lista.appendChild(option);
    }
}

//Validación del formulario
//Mostrado de errores del formulario
function error2(element, missatge){
    var error = document.getElementById("missatgeError");
    var msgError = document.createTextNode(missatge);

    error.appendChild(msgError);
    element.className = "error";
    element.focus();
}

//Borrado de errores
function esborrarError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.length; i++){
        formulari.elements[i].className = "";
    }

    var msgError = document.getElementById("missatgeError");
    var contMsgError = document.createTextNode("");

    msgError.replaceChildren(contMsgError);
}

//Validación del formulario
function validar(e){
    e.preventDefault();
    esborrarError();

    if(validaTitol() && validaEditorial() && validaPreu() && validaSelectAutor()){
        modificaLlibre();
    } else {
        console.error("No se ha podido modificar el libro seleccionado");
    }
}

//Validación del campo título
function validaTitol(){
    var titol = document.getElementById("titol");

    if(!titol.checkValidity()){
        if(titol.validity.valueMissing){
            error2(titol, "El campo del título no se puede dejar en blanco");
        } else if(titol.validity.patternMismatch){
            error2(titol, "El titulo ha de contener almenos 3 caracteres, los quales no pueden ser especiales");
        }
        return false;
    }
    return true;
}

//Validación del campo editorial
function validaEditorial(){
    var editorial = document.getElementById("editorial");

    if(!editorial.checkValidity()){
        if(editorial.validity.valueMissing){
            error2(editorial, "El campo de editorial no se puede dejar vacío");
        } else if(editorial.validity.patternMismatch){
            error2(editorial, "El editorial ha de contener almenos 3 caracteres, los quales no pueden ser espciales");
        }
        return false;
    }
    return true;
}

//Validación del precio del libro
function validaPreu(){
    var precio = document.getElementById("precio");

    if(!precio.checkValidity){
        if(precio.validity.valueMissing){
            error2(precio, "El campo de precio no se puede dejar vacio");
        } else if(precio.validity.rangeUnderflow){
            error2(precio, "El precio del libro no puede ser inferior a 0");
        }
        return false;
    }
    return true;
}

//Validación del autor seleccionado
function validaSelectAutor(){
    var listaAutores = document.getElementById("autor");
    
    if(listaAutores[listaAutores.selectedIndex].value == ""){
        error2(listaAutores, "Se ha de seleccionar un autor");
        return false;
    } else {
        esborrarError();
        return true;
    }
}

function modificaLlibre(){
    var idLlibre = modLlibre.id;
    const apiLlibres = "https://serverred.es/api/libros/"+idLlibre;

    var listaAutores = document.getElementById("autor");
    var idAutor;

    arrayIdAutors.forEach(element => {
        if(listaAutores[listaAutores.selectedIndex].id == element){
            idAutor = element;
            return idAutor;
        }
    })

    var newLlibre = {
        titulo: document.getElementById("titol").value,
        editorial: document.getElementById("editorial").value,
        precio: document.getElementById("precio").value,
        autor: idAutor
    }

    fetch(apiLlibres, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newLlibre),
    })
    .then(response => response.json())
    .then(data => location.assign("../html/llistatLlibres.html"))
    .catch((error) => {
        console.log("Error => ", error)
    })
}