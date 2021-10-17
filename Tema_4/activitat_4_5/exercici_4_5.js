window.onload = main;

function main(){
    document.getElementById("afegir").addEventListener("click", afegirElement);
    document.getElementById("eliminar").addEventListener("click", borrarElement);
}

//Introduim l'element que s'afegirà a la llista i en cas de deixar el camp buit avisa
function afegirElement(){
    var respuesta = prompt("Introdueix l'element que vols afegir a la llista");
    
    if(respuesta == ""){
        alert("No pots deixar aquest camp en blanc");
    } else {
        var llistat = document.getElementById("listado");
        //Creem un element de tipus '<li>'
        var items = document.createElement("li");
        //Li afegim com a fill el text que li pasem per prompt
        items.appendChild(document.createTextNode(respuesta));
        //Li afegim al llistat amb etiqueta '<ol>' l'element '<li>'
        //introduit per l'usuari
        llistat.appendChild(items);
    }
}

//Elimina l'últim element de la llista
function borrarElement(){
    var pare = document.getElementById("listado");
    var fill = document.getElementsByTagName("li");

    //Obtenim l'ultim element de la llista
    var ultimValor = fill[fill.length -1];

    pare.removeChild(ultimValor);
}