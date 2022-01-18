window.onload = main;

function main() {
    compruebaLog();
    getToken();
    getMesas();
}

const apiMesas = "https://restaurante.serverred.es/api/mesas";
var token = "";

//Obtención del token de usuario
function getToken() {
    if(JSON.parse(localStorage.getItem("auth-token")) != null) {
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
        console.log(element);
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
        //TODO: boto_borrar.addEventlistener("click", comprovar);

        //Botó per a editar la taula
        var boto_editar = document.createElement("button");
        boto_editar.setAttribute("class", "btn btn-primary btn-lg editar");
        boto_editar.setAttribute("id", idMesa);
        boto_editar.appendChild(val_boto_editar);
        //TODO: boto_editar.addEventlistener("click", comprovar);

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
