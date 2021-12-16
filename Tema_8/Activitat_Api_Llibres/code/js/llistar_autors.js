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
                console.log(element);
                var ano_nacimiento = element.año_nacimiento;
                var nombre_autor = element.nombre;
                var num_mods = element.__v;
                var id_autor = element._id;

                var val_ano_nac = document.createTextNode(ano_nacimiento);
                var val_nombre_aut = document.createTextNode(nombre_autor);
                //var val_num_mods = document.createTextNode(num_mods);
                //var val_id_aut = document.createTextNode(id_autor);

                var tr = document.createElement("tr");
                var td_1 = document.createElement("td");
                var td_2 = document.createElement("td");
                


                //tr.appendChild(td_1);
                //tr.appendChild(td_2);
                
                //lista.appendChild(tr);
            })
        )
}