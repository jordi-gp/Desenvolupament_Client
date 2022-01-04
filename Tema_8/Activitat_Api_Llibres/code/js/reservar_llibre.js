window.onload = main;

function main(){
    mostraInfoUsuario();
    fetch(apiAutores)
    .then(response => response.json())
    .then(data_aux => {
        data_aux.resultado.forEach(element => {
            arrayInfoAux.push(element);
        })
        listaLibros();
    })
    //En caso de haver un fallo se notifica por consola
    .catch(error => {
        console.log("Ha ocorregut un error realitzant la petició => " + error);
    })
}

var usuario;
var cliente;
var arrayInfo = [];
var arrayInfoAux = [];
const apiLibros = "https://serverred.es/api/libros";
const apiAutores= "https://serverred.es/api/autores";

//Obtención del usuario almacenado en el localStorage
function getUsuario(){
    if(JSON.parse(localStorage.getItem("Usuario")) != null){
        usuario = JSON.parse(localStorage.getItem("Usuario"));
        return usuario;
    }
}

//Función para mostrar la información del cliente seleccionado
function mostraInfoUsuario(){
    getUsuario();

    var infoUsu = document.getElementById("usuari");
    var valInfoUsu = document.createTextNode(usuario.nombre+" - "+usuario.email);

    infoUsu.appendChild(valInfoUsu);
}

function listaLibros(){
    fetch(apiLibros)
    .then(response => response.json())
    .then(data => data.resultado.forEach(element => {
        //Lista en la que se van a añadir los elementos
        var lista = document.getElementById("files");

        //Nodos de texto
        var titulo = document.createTextNode(element.titulo);
        var editorial = document.createTextNode(element.editorial);
        var precio = document.createTextNode(element.precio);
        var autor = document.createTextNode(buscarAutor(element.autor));

        //Botón checkbox
        var checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.setAttribute("id", element._id);
        checkBox.addEventListener("click", compraLlibre);

        //Elementos del documento 'HTML'
        var tr = document.createElement("tr");
        var td_1 = document.createElement("td");
        var td_2 = document.createElement("td");
        var td_3 = document.createElement("td");
        var td_4 = document.createElement("td");
        var td_5 = document.createElement("td");

        //Añadido del contenido a las columnas
        td_1.appendChild(checkBox);
        td_2.appendChild(titulo);
        td_3.appendChild(editorial);
        td_4.appendChild(precio);
        td_5.appendChild(autor);

        //Añádido del contenido a la tabla
        tr.appendChild(td_1);
        tr.appendChild(td_2);
        tr.appendChild(td_3);
        tr.appendChild(td_4);
        tr.appendChild(td_5);

        lista.appendChild(tr);

        arrayInfo.push(element);
        
    }))
    .then(filtro => {
        filtrar();
    })
}

//Función para mostrar el nombre de los autores en la lista
function buscarAutor(autor) {
    arrayInfoAux.forEach(element => {
        if(autor == element._id){
            autor = element.nombre;
            return autor;
        }
    })
    return autor;
}

//Función del filtro para buscar libros
function filtrar() {
    var arrTitulos = [];

    arrayInfo.forEach(element => {
        arrTitulos.push(element.titulo);
    })
    
    $("#titol").autocomplete({
        source:arrTitulos
    });
}

//Función para comprar libros
function compraLlibre(){
    getCliente();
    var newPedido;

    arrayInfo.forEach(element => {
        if(this.id == element._id){
            newPedido = {
                idCliente: cliente.id,
                nombreCliente: cliente.nombre,
                idLibro: element._id,
                libroComprado: element.titulo
            }
        }
        localStorage.setItem("newPedido", JSON.stringify(newPedido));
    })
    location.assign("../html/reservarConfirmar.html");
}

//Función para crear obtener el nombre del cliente
function getCliente() {
    if(JSON.parse(localStorage.getItem("Usuario")) != null) {
        cliente = JSON.parse(localStorage.getItem("Usuario"));
        return cliente;
    }
}