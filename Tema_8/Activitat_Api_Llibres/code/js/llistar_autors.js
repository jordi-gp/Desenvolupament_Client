window.onload = main;

function main(){
    cridaApi();
}

var arrayAux = [];

function cridaApi(){
    var url = "https://www.serverred.es/api/autores";
    var lista = document.getElementById("files");

    fetch(url)
        .then(response => response.json())
        .then(data =>
            data.resultado.forEach(element => {
                //Valores obtenidos del 'JSON'
                var ano_nacimiento = element.año_nacimiento;
                var nombre_autor = element.nombre;
                var id_autor = element._id;

                //Nodos de texto
                var val_ano_nac = document.createTextNode(ano_nacimiento);
                var val_nombre_aut = document.createTextNode(nombre_autor);
                var text_boto_editar = document.createTextNode("Modificar");
                var text_boto_borrar = document.createTextNode("Esborrar");

                //Botones de la pàgina
                //Botón para borrar el autor
                var boto_borrar = document.createElement("button");
                boto_borrar.setAttribute("class", "btn btn-primary btn-lg borrar");
                boto_borrar.setAttribute("id", id_autor);
                boto_borrar.appendChild(text_boto_borrar);
                boto_borrar.addEventListener("click", borrarAutor);

                //Botón para modificar el autor
                var boto_editar = document.createElement("button");
                boto_editar.setAttribute("class", "btn btn-primary btn-lqg editar");
                boto_editar.setAttribute("id", id_autor);
                boto_editar.appendChild(text_boto_editar);
                boto_editar.addEventListener("click", editarAutor);

                //Elementos del documento 'HTML'
                var tr = document.createElement("tr");
                var td_1 = document.createElement("td");
                var td_2 = document.createElement("td");
                var td_3 = document.createElement("td");
                var td_4 = document.createElement("td");
                
                //Añadido de información a cada campo
                td_1.appendChild(boto_borrar);
                td_2.appendChild(boto_editar);
                td_3.appendChild(val_nombre_aut);
                td_4.appendChild(val_ano_nac);

                //Agregamiento a los campos creados a la tabla
                tr.appendChild(td_1);
                tr.appendChild(td_2);
                tr.appendChild(td_3);
                tr.appendChild(td_4);

                lista.appendChild(tr);

                arrayAux.push(element);
            })
        )
        .catch(error => {
            console.log("Ha ocorregut un error realitzant la petició " + error);
        })
}

//Función para borrar el autor seleccionado
function borrarAutor(){
    var id = this.id;
    var url = "https://www.serverred.es/api/autores/"+id;

    fetch(url, {
        method: "DELETE"
    })
    var elementEsborrar = document.getElementById(id);
    elementEsborrar.parentNode.parentNode.parentNode.removeChild(elementEsborrar.parentNode.parentNode);
}

//Función para enviar al formulario de edición del autor
function editarAutor(){
    arrayAux.forEach(element => {
        if(this.id == element._id){
            var objAutor = {
                nombre: element.nombre,
                año_nacimiento: element.año_nacimiento,
                id: element._id
            }
            localStorage.setItem("Autor", JSON.stringify(objAutor));
        }
    })
    location.assign("../html/modificarAutors.html");
}
