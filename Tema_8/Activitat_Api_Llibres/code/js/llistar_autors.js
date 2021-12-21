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
                //var num_mods = element.__v;
                var id_autor = element._id;

                //Nodos de texto
                var val_ano_nac = document.createTextNode(ano_nacimiento);
                var val_nombre_aut = document.createTextNode(nombre_autor);
                //var val_num_mods = document.createTextNode(num_mods);
                //var val_id_aut = document.createTextNode(id_autor);
                var text_boto_editar = document.createTextNode("Modificar");
                var text_boto_borrar = document.createTextNode("Esborrar");

                //Botones de la pàgina
                //Botón para borrar el autor
                var boto_borrar = document.createElement("button");
                boto_borrar.setAttribute("class", "btn btn-primary btn-lg borrar");
                boto_borrar.setAttribute("id", id_autor);
                boto_borrar.appendChild(text_boto_borrar);

                //Botón para modificar el autor
                var boto_editar = document.createElement("button");
                boto_editar.setAttribute("class", "btn btn-primary btn-lqg editar");
                boto_editar.setAttribute("id", id_autor);
                boto_editar.appendChild(text_boto_editar);

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
        .then(afegirEventBorrar)
        .then(afegirEventEditar)
        .catch(error => {
            console.log("Ha ocorregut un error realitzant la petició " + error);
        })
}

//Añadido de los eventos para borrar autores
function afegirEventBorrar(){
    var llistaBotons = document.getElementsByClassName("borrar");

    for(var i=0; i < llistaBotons.length; i++){
        llistaBotons[i].addEventListener("click", borrarAutor);
    }
}

//Añadido de los eventos para editar autores
function afegirEventEditar(){
    var llistaBotons = document.getElementsByClassName("editar");
    
    for(var i=0; i < llistaBotons.length; i++){
        llistaBotons[i].addEventListener("click", editarAutor);
    }
}

//Función para borrar el autor seleccionado
function borrarAutor(){
    var id = this.id;
    var url = "https://www.serverred.es/api/autores/"+id;

    fetch(url, {
        method: "DELETE"
    })
    .then(location.reload())

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
            console.log(element._id);
            localStorage.setItem("Autor", JSON.stringify(objAutor));
        }
    })
    location.assign("../html/modificarAutors.html");
}
