window.onload = main;

function main() {
    compruebaLog();
    getToken();
    getMesas();
    document.getElementById("newMesa").addEventListener("click", añadirMesa);
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

//Obtención de la información de las mesas
function getMesas() {
    fetch(apiMesas, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token.token
            }
        })
        .then(response => response.json())
        .then(data => data.data.data.forEach(element => {
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
            //TODO: boto_borrar.addEventListener("click", borrarMesa);

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
        }));
}

//TODO: Función para añadir nuevas mesas
function añadirMesa() {
    var formulario = document.getElementById("formulario");
    formulario.setAttribute("class", "");

    //document.getElementById("cancelar").addEventListener("click", borrarFormulario);
    //document.getElementById("confirmar").addEventListener("click", validar);
}

//TODO: validar formulario
//TODO: borrar formulario añadido
//TODO: añadir nueva mesa

//Función para editar las mesas
function editarMesa() {
    var formulario = document.getElementById("formulario");
    formulario.setAttribute("class", "");
    console.log(this.parentNode.parentNode.childNodes)

    var llista = this.parentNode.parentNode.childNodes;
    //console.log(llista[3].innerText)

    document.getElementById("numero").setAttribute("value", llista[2].innerText)
    document.getElementById("comensales").setAttribute("value", llista[3].innerText);
    document.getElementById("descripcion").setAttribute("value", llista[4].innerText);

    var id = document.getElementById("_id").value = this.id;

}


//TODO:Función para comprovar que la mesa esta vacia
function comprovarMesa() {

}

//TODO:Función para eliminar la mesa
function borrarMesa(id) {
    console.log(this.id);
    // var url = apiMesas+"/"+id;

    // fetch(url, {
    //     method: "DELETE"
    // })

    // var mesaBorrada = document.getElementById(id);
    // mesaBorrada.parentNode.parentNode.parentNode.removeChild(mesaBorrada.parentNode.parentNode);
}