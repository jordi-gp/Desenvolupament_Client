window.onload = main;

function main() {
    compruebaLog();
    getToken();
    getMesas();
    document.getElementById("newMesa").addEventListener("click", nuevaMesa);
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
    boto_editar.addEventListener("click", getInfoMesa);

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

//Borrar formulario añadido
function borrarFormulario() {
    var formulario = document.forms[0];

    for (var i = 0; i < formulario.elements.lengt - 2; i++) {
        formulario.elements[i].setAttribute("value", "");
        console.log(formulario.elements[i]);
    }
}

//TODO: Función para añadir nuevas mesas
function nuevaMesa() {
    borrarFormulario();
    var formulario = document.getElementById("formulario");
    formulario.setAttribute("class", "");

    document.getElementById("confirmar").addEventListener("click", anyadirMesa, false);
    document.getElementById("cancelar").addEventListener("click", cancelar => {
        borrarFormulario();
        document.getElementById("formulario").setAttribute("class", "visually-hidden");
    });
}

function anyadirMesa(e) {
    borrarErrores();
    e.preventDefault();

    if (validaNumMesa() && validaNumComensales() && validaDescripcion()) {
        //En caso de ser válido el formulario
        var numMesa = document.getElementById("numero").value;
        var numComensales = document.getElementById("comensales").value;
        var descripcion = document.getElementById("descripcion").value;

        var newMesa = {
            comensales: numComensales,
            descripcion: descripcion,
            numero: numMesa
        }

        fetch(apiMesas, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token.token
                },
                body: JSON.stringify(newMesa)
            })
            .then(response => response.json())
            .then(data => addMesa(data.resultado))
            .then(borrarFormulario())
            .catch((error) => {
                console.log("Error => ", error)
            });
        return true;
    } else {
        return false;
    }
}

//Función para editar las mesas
function getInfoMesa() {
    var formulario = document.getElementById("formulario");
    formulario.setAttribute("class", "");
    var llista = this.parentNode.parentNode.childNodes;

    document.getElementById("_id").setAttribute("value", this.id);
    document.getElementById("numero").setAttribute("value", llista[2].innerText);
    document.getElementById("comensales").setAttribute("value", llista[3].innerText);
    document.getElementById("descripcion").setAttribute("value", llista[4].innerText);

    console.log(llista[2].innerText)
    console.log(llista[3].innerText)
    console.log(llista[4].innerText)

    document.getElementById("confirmar").addEventListener("click", (e) => {
        e.preventDefault();
        editarMesa();
    })
    // document.getElementById("confirmar").addEventListener("click", editarMesa);
    document.getElementById("cancelar").addEventListener("click", cancelar => {
        borrarFormulario();
        document.getElementById("formulario").setAttribute("class", "visually-hidden");
    });
}

//Función para editar la mesa seleccionada
function editarMesa() {
    borrarErrores();
    // e.preventDefault();

    if (validaNumMesa() && validaNumComensales() && validaDescripcion()) {
        //En caso de validar el formulario
        var id = document.getElementById("_id").value;
        var numMesa = document.getElementById("numero").value;
        var numComensales = document.getElementById("comensales").value;
        var descripcion = document.getElementById("descripcion").value;

        var valId = document.createTextNode(id);
        var valNumMesa = document.createTextNode(numMesa);
        var valNumComen = document.createTextNode(numComensales);
        var valDescripcion = document.createTextNode(descripcion);

        var fila = document.getElementById(id).parentNode.parentNode.childNodes;

        var mesa = {
            comensales: numComensales,
            descripcion: descripcion,
            numero: numMesa
        }

        var idMesa = document.getElementById("_id").value;
        var urlMesa = apiMesas + "/" + idMesa;

        fetch(urlMesa, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": token.token
                },
                body: JSON.stringify(mesa)
            })
            .then(response => response.json())
            .then(cambiar => {
                fila[2].replaceChildren(valNumMesa);
                fila[3].replaceChildren(valNumComen);
                fila[4].replaceChildren(valDescripcion);
                document.getElementById("formulario").setAttribute("class", "visually-hidden");
            })
            .catch((error) => {
                console.log("Error => ", error)
            });

        return true;
    } else {
        return false;
    }
}

//TODO:Función para comprovar que la mesa esta vacia
// function comprovarMesa() {

// }

//TODO:Función para eliminar la mesa
function borrarMesa(id) {
    console.log(this.id);
    id = this.id;
    var url = apiMesas+"/"+id;

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
    var formulario = document.forms[0];

    for (var i = 0; i < formulario.elements.length; i++) {
        formulario.elements[i].className = "form-control";
    }

    var msgError = document.createTextNode("");
    var error = document.getElementById("missatgeError");

    error.replaceChildren(msgError);
}