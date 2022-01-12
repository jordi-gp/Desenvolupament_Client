window.onload = main;

function main() {
    carregaUsuaris();
}

const apiUsuaris = "https://serverred.es/api/usuarios";
var arrInfo = [];

function carregaUsuaris() {
    fetch(apiUsuaris)
    .then(response => response.json())
    .then(data => data.resultado.forEach(element => {
        //Lista en la que se añadirán los elementos
        var files = document.getElementById("files");
        
        //Id del usuario
        var idUsuari = element._id;

        //Nodos de texto
        var nombre = document.createTextNode(element.nombre);
        var telefono = document.createTextNode(element.telefono);
        var email = document.createTextNode(element.email);
        var direccion = document.createTextNode(element.direccion);

        //Botón checkbox para realizar la reserva
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.setAttribute("id", idUsuari);
        checkBox.addEventListener("click", confirmarUsuario);

        //Elementos del 'HTML'
        var tr = document.createElement("tr");
        var td_1 = document.createElement("td");
        var td_2 = document.createElement("td");
        var td_3 = document.createElement("td");
        var td_4 = document.createElement("td");
        var td_5 = document.createElement("td");

        //Añadido de contenido a la lista
        td_1.appendChild(checkBox);
        td_2.appendChild(nombre);
        td_3.appendChild(telefono);
        td_4.appendChild(email);
        td_5.appendChild(direccion);

        tr.appendChild(td_1);
        tr.appendChild(td_2);
        tr.appendChild(td_3);
        tr.appendChild(td_4);
        tr.appendChild(td_5);

        files.appendChild(tr);

        arrInfo.push(element);
    }))
}

//Selección del usuario que va a realizar la reserva
function confirmarUsuario() {
    arrInfo.forEach(element => {
        if(this.id == element._id){
            var objUsuario = {
                id: element._id,
                nombre: element.nombre,
                email: element.email
            }
            localStorage.setItem("Usuario", JSON.stringify(objUsuario));
        }
    })
    location.assign("../html/reservarLlibre.html");
}
