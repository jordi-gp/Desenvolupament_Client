window.onload = main;

function main() {
    compruebaLog();
    getToken();
    getMesas();
    document.getElementById("newMesa").addEventListener("click", mostrarFormulario);
}

var token = "";
const apiMesas = "https://restaurante.serverred.es/api/mesas";

//Obtención del token de usuario
function getToken() {
    if (JSON.parse(localStorage.getItem("auth-token")) != null) {
        token = JSON.parse(localStorage.getItem("auth-token"));
    }
    return token;
}

function addMesa(element) {
    //Información obtenida del JSON
    var numMesa = element.numero;
    var numComensales = element.comensales;
    var descripcion = element.descripcion;
    var idMesa = element._id;

    //Nodos de texto utilizados
    var val_boto_borrar = document.createTextNode("Borrar");
    var val_boto_editar = document.createTextNode("Editar");
    var val_numMesa = document.createTextNode(numMesa);
    var val_numComensales = document.createTextNode(numComensales);
    var val_descripcion = document.createTextNode(descripcion);

    //Botó per borrar la taula
    var boto_borrar = document.createElement("button");
    boto_borrar.setAttribute("class", "btn btn-primary btn-lg borrar");
    boto_borrar.setAttribute("id", idMesa);
    boto_borrar.appendChild(val_boto_borrar);
    boto_borrar.addEventListener("click", borrarMesa);

    //Botó per a editar la taula
    var boto_editar = document.createElement("button");
    boto_editar.setAttribute("class", "btn btn-primary btn-lg editar");
    boto_editar.setAttribute("id", idMesa);
    boto_editar.appendChild(val_boto_editar);
    boto_editar.addEventListener("click", editarMesa);

    //Elements del HTML
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");

    //Añadido de información a las columnas
    td1.appendChild(boto_borrar);
    td2.appendChild(boto_editar);
    td3.appendChild(val_numMesa);
    td4.appendChild(val_numComensales);
    td5.appendChild(val_descripcion);

    //Añadido de las columnas a las filas
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    //Añadido de la tabla al documento
    var tabla = document.getElementById("files");
    tabla.appendChild(tr);
}

//Obtención de la información de las mesas
function getMesas() {
    document.getElementById("formulario").setAttribute("class", "visually-hidden");

    fetch(apiMesas, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => data.data.data.forEach(element => {
            addMesa(element)
        }));
}

//Función para mostrar el formulario
function mostrarFormulario() {
    //TODO: Solucionar esta porqueria
    var form = document.forms[0];

    for (var i = 0; i < form.elements.length; i++) {
        form.elements[i].setAttribute("value", "");
    }

    document.getElementById("formulario").setAttribute("class", "");

    document.getElementById("confirmar").addEventListener("click", validar, false);
    document.getElementById("cancelar").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("formulario").setAttribute("class", "visually-hidden");
    });
}

//Funcionalidades de la pàgina
//Función para añadir una nueva mesa
function nuevaMesa() {
    //Información del formulario
    var numMesa = document.getElementById("numero");
    var numComensales = document.getElementById("comensales");
    var descMesa = document.getElementById("descripcion");

    //Objeto de tipo mesa
    var mesa = {
        numero: numMesa.value,
        comensales: numComensales.value,
        descripcion: descMesa.value
    }

    //Petición a la API para añadir una nueva mesa
    fetch(apiMesas, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            },
            body: JSON.stringify(mesa)
        })
        .then(response => response.json())
        .then(data => addMesa(data.resultado))
        .catch((error) => {
            console.log("Error => ", error);
        })
    document.getElementById("formulario").setAttribute("class", "visually-hidden");
}

//Función para obtener la información de la mesa
function editarMesa() {
    mostrarFormulario();

    var lista = this.parentNode.parentNode.childNodes;

    //Información del formulario
    var idPlato = document.getElementById("_id");
    var numMesa = document.getElementById("numero");
    var numComensales = document.getElementById("comensales");
    var descMesa = document.getElementById("descripcion");

    idPlato.setAttribute("value", this.id);
    numMesa.setAttribute("value", lista[2].innerText);
    numComensales.setAttribute("value", lista[3].innerText);
    descMesa.setAttribute("value", lista[4].innerText);
}

//Función para enviar la información actualizada de la mesa
function enviaEdicion() {
    //Información del formulario
    var idMesa = document.getElementById("_id");
    var numMesa = document.getElementById("numero");
    var numComensales = document.getElementById("comensales");
    var descMesa = document.getElementById("descripcion");

    var lista = document.getElementById(idMesa.value).parentNode.parentNode.childNodes;

    //Objeto de tipo mesa a actualizar
    var mesaAct = {
        numero: numMesa.value,
        comensales: numComensales.value,
        descripcion: descMesa.value
    }

    var url = apiMesas + "/" + idMesa.value;

    fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            },
            body: JSON.stringify(mesaAct)
        })
        .then(response => response.json())
        .then(cambiar => {
            lista[2].replaceChildren(numMesa.value);
            lista[3].replaceChildren(numComensales.value);
            lista[4].replaceChildren(descMesa.value);
            document.getElementById("formulario").setAttribute("class", "visually-hidden");
        })
        .catch((error) => {
            console.log("Error => ", error);
        })
}

//Función para eliminar la mesa
function borrarMesa() {
    id = this.id;
    var url = apiMesas + "/" + id;

    fetch(url, {
            method: "DELETE",
            headers: {
                "auth-token": token.token
            }
        })
        .catch((error) => {
            console.log("Error => ", error)
        });

    var mesaBorrada = document.getElementById(id);
    mesaBorrada.parentNode.parentNode.parentNode.removeChild(mesaBorrada.parentNode.parentNode);
}


//Validación del formulario
function validar(e) {
    e.preventDefault();
    borrarErrores();

    var id = document.getElementById("_id").value;

    if (validaNumMesa() && validaNumComensales() && validaDescripcion()) {
        if (id == "") {
            nuevaMesa();
        } else {
            enviaEdicion();
        }
    }
}

//Validaciones del formulario
function validaNumMesa() {
    var mesa = document.getElementById("numero");

    if (!mesa.checkValidity()) {
        if (mesa.validity.valueMissing) {
            error2(mesa, "Se ha de indicar el número de la mesa");
        } else if (mesa.validity.patternMismatch) {
            error2(mesa, "El número de mesa introducido no es correcto");
        } else if (mesa.validity.rangeOverflow) {
            error2(mesa, "El número de mesa no puede ser superior a 100");
        } else if (mesa.validity.rangeUnderflow) {
            error2(mesa, "El número de mesa no puede ser inferior a 1");
        }
        return false;
    }
    return true;
}

function validaNumComensales() {
    var numComensales = document.getElementById("comensales");

    if (!numComensales.checkValidity()) {
        if (numComensales.validity.valueMissing) {
            error2(numComensales, "Se ha de indicar de forma obligatoria el número de comensales");
        } else if (numComensales.validity.patternMismatch) {
            error2(numComensales, "El número introducido no es correcto");
        } else if (numComensales.validity.rangeOverflow) {
            error2(numComensales, "El número de comensales no puede ser superior a 50");
        } else if (numComensales.validity.rangeUnderflow) {
            error2(numComensales, "El número de comensales no puede ser inferior a 1");
        }
        return false;
    }
    return true;
}

function validaDescripcion() {
    var descripcion = document.getElementById("descripcion");

    if (!descripcion.checkValidity()) {
        if (descripcion.validity.valueMissing) {
            error2(descripcion, "Se ha de proporcionar una descripción");
        }
        return false;
    }
    return true;
}

//Mostrado y borrado de errores en el formulario
function error2(element, missatge) {
    var msgError = document.createTextNode(missatge);
    var error = document.getElementById("missatgeError");

    error.replaceChildren(msgError);
    element.focus();
}

function borrarErrores() {
    //var formulario = document.forms[0];

    var msgError = document.createTextNode("");
    var error = document.getElementById("missatgeError");

    error.replaceChildren(msgError);
}