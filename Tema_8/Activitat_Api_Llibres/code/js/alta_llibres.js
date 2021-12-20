window.onload = main;

function main(){
    carregaAutors();
    document.getElementById("btnGravar").addEventListener("click", validar, false);
}

/******************
* OBJETO A CARGAR *
******************/
/*var libroSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    editorial:{
        type: String,
        trim: true
    },
    precio:{
        type: Number,
        required: true,
        min: 0,
        trim: true
    },
    autor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autor'
    }
})*/

//Función para cargar un nuevo libro una vez se han completado las validaciones
function carregaNouLlibre(){
    var valTitol = document.getElementById("titol").value;
    var valEditorial = document.getElementById("editorial").value;
    var valPreu = document.getElementById("precio").value;
    var valAutor = document.getElementById("autor").value;

    libroSchema = {
        titulo: valTitol,
        editorial: valEditorial,
        precio: valPreu,
        autor: valAutor
    }

    fetch("https://www.serverred.es/api/libros", {
        method: "POST",
        body: JSON.stringify(libroSchema),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
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
    esborrarError();

    if(validaTitulo() && validaEditorial() && validaPreu() && validaSelectAutor()){
        //carregaNouLlibre;
        return true;
    } else {
        e.preventDefault();
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

    if(titulo.value == ""){
        error2(titulo, "El campo de título no se puede dejar vacío");
        return false;
    } else if(titulo.value.length < 3){
        error2(titulo, "El campo del título ha de contener almenos 3 caracteres");
        return false;
    } else if(titulo.value.length > 250){
        error2(titulo, "El campo del título no puede contener mas de 250 caracteres");
    } else {
        esborrarError();
        return true;
    }
}

// function validaTitulo(){
//     var titulo = document.getElementById("titol");

//     if(!titulo.checkValidity()){
//         if(titulo.validity.valueMissing){
//             error2(titulo, "El campo de título no se puede dejar en blanco");
//         }
//         if(titulo.validity.patternMismatch){
//             error2(titulo, "El título ha de tener como mínimo 3 caracteres");
//         }
//         return false;
//     }
//     esborrarError();
//     return true;
// }

//Validación del editorial seleccionado
function validaEditorial(){
    var editorial = document.getElementById("editorial");

    if(editorial.value == ""){
        error2(editorial, "El campo de editorial no puede estar vacío");
        return false;
    } else if(editorial.value.length < 3){
        error2(editorial, "El campo de editorial ha de contener como mínimo 3 caracteres");
    } else if(editorial.value.length > 250){
        error2(editorial, "El campo de editorial no puede contener más de 250 caracteres");
    } else {
        esborrarError();
        return true;
    }
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