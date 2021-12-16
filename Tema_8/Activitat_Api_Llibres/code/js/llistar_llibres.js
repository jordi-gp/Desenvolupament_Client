window.onload = main;

function main(){
    cridaApi();
}

//TODO: mostrar el llistat de llibres

function cridaApi(){
    var url = "https://www.serverred.es/api/libros";
    var llista = document.getElementById("files");

    fetch(url)
        .then(response => response.json())
        .then(data => 
            data.resultado.forEach(element => {
                console.log(element);
                var titulo = element.titulo;
                var editorial = element.editorial;
                var precio = element.precio;
                var num_mods = element.__v;
                var id_llibre = element._id;
                var autor = element.autor;

                llista.innerHTML += "<th></th>"+
                                    "<th>"+num_mods+"</th>"+
                                    "<th>"+titulo+"</th>"+
                                    "<th>"+editorial+"</th>"+
                                    "<th>"+precio+"</th>"+
                                    "<th>"+autor+"</th>";
            })
        )

}