window.onload = main;

function main() {
    var url_aux = "https://www.serverred.es/api/autores";
    //Uso de arrays para guardar la información de la API
    fetch(url_aux)
        .then(response => response.json())
        .then(data_aux => {
            data_aux.resultado.forEach(element => {
                arrInfoAux.push(element);
            })
            cridaApi();
        })
        //En caso de fallar la petición, la capturamos
        .catch(error => {
            console.log("Ha ocorregut un error realitzant la petició " + error);
        })
}

var arrInfo = [];
var arrInfoAux = [];

function cridaApi() {
    var url = "https://www.serverred.es/api/libros";
    var lista = document.getElementById("files");
    //console.log(arrInfoAux[1])

    fetch(url)
        .then(response => response.json())
        .then(data => data.resultado.forEach(element => {
            arrInfo.push(element);

            //Valores obtenidos del 'JSON'
            var id_llibre = element._id;
            var titulo = element.titulo;
            var editorial = element.editorial;
            var precio = element.precio;
            var autor = element.autor;
            var num_mods = element.__v;

            //Nodos de texto
            var val_titulo = document.createTextNode(titulo);
            var val_editorial = document.createTextNode(editorial);
            var val_precio = document.createTextNode(precio);
            var val_autor = document.createTextNode(buscarAutor(autor));
            var val_boto_esborrar = document.createTextNode("Esborrar");
            var val_boto_modificar = document.createTextNode("Modificar");

            //Botones de la pàgina
            var boto_esborrar = document.createElement("button");
            boto_esborrar.setAttribute("class", "btn btn-primary btn-lg borrar");
            boto_esborrar.setAttribute("id", id_llibre);
            boto_esborrar.appendChild(val_boto_esborrar);
            boto_esborrar.addEventListener("click", borrarLlibre);

            var boto_modificar = document.createElement("button");
            boto_modificar.setAttribute("class", "btn btn-primary btn-lg editar");
            boto_modificar.setAttribute("id", id_llibre);
            boto_modificar.appendChild(val_boto_modificar);
            boto_modificar.addEventListener("click", editarLlibre);

            //Elementos del documento 'HTML'
            var tr = document.createElement("tr");
            var td_1 = document.createElement("td");
            var td_2 = document.createElement("td");
            var td_3 = document.createElement("td");
            var td_4 = document.createElement("td");
            var td_5 = document.createElement("td");
            var td_6 = document.createElement("td");

            //Añadido de información a cada campo
            td_1.appendChild(boto_esborrar);
            td_2.appendChild(boto_modificar);
            td_3.appendChild(val_titulo);
            td_4.appendChild(val_editorial);
            td_5.appendChild(val_precio);
            td_6.appendChild(val_autor);

            //Agregamiento a los campos creados a la tabla
            tr.appendChild(td_1);
            tr.appendChild(td_2);
            tr.appendChild(td_3);
            tr.appendChild(td_4);
            tr.appendChild(td_5);
            tr.appendChild(td_6);
            lista.appendChild(tr);
        }))
        .catch(error => {
            console.log("Ha ocorregut un error realitzant la petició " + error);
        })
}

function buscarAutor(val_autor) {
    arrInfoAux.forEach(element => {
        if(val_autor == element._id){
            val_autor = element.nombre;
            return val_autor;
        }
    });
    return val_autor;
}

//Función para borrar libros
function afegirEventBorrar(){
    var llistaBotons = document.getElementsByClassName("borrar");

    for(var i=0; i < llistaBotons.length; i++){
        llistaBotons[i].addEventListener("click", borrarLlibre);
    }
}

//Función para editar libros
function afegirEventEditar(){
    var llistaBotons = document.getElementsByClassName("editar");
    
    for(var i=0; i < llistaBotons.length; i++){
        llistaBotons[i].addEventListener("click", editarLlibre);
    }
}

//Función para borrar el libro seleccionado
function borrarLlibre(){
    var id = this.id;  
    var url = "https://serverred.es/api/libros/"+id;

    fetch(url, {
        method: "DELETE"
    })
    var elementEsborrar = document.getElementById(id);
    elementEsborrar.parentNode.parentNode.parentNode.removeChild(elementEsborrar.parentNode.parentNode);
}

//Función para editar el libro seleccionado
function editarLlibre(){
    arrInfo.forEach((element, index) => {
        if(this.id == element._id){
            var objLlibre = {
                autor: element.autor,
                editorial: element.editorial,
                precio: element.precio,
                titulo: element.titulo,
                id: element._id
            }
            localStorage.setItem("Llibre", JSON.stringify(objLlibre));
        }
    })
    location.assign("../html/modificarLlibres.html");
}
