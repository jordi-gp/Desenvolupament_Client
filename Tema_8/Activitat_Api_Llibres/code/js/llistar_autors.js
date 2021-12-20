window.onload = main;

function main(){
    cridaApi();
}

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
                boto_borrar.setAttribute("class", "btn btn-primary btn-lg");
                boto_borrar.appendChild(text_boto_borrar);

                //Botón para modificar el autor
                var boto_editar = document.createElement("button");
                boto_editar.setAttribute("class", "btn btn-primary btn-lqg");
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
            })
        )
}