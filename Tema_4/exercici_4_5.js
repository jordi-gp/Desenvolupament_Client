window.onload = main;

function main(){
    document.getElementById("afegir").addEventListener("click", afegirElement);
    document.getElementById("eliminar").addEventListener("click", borrarElement);
}

function afegirElement(){
    var respuesta = prompt("Introdueix l'element que vols afegir a la llista");
    
    if(respuesta == ""){
        alert("No pots deixar aquest camp en blanc");
    } else {
        var objecte = document.getElementsByTagName("ol");   //obtenim el id del llistat amb les etiquetes '<ol></ol>'
        objecte = document.createElement("li");   //creem l'element de tipus '<li></li>'
        var contingut = document.createTextNode(respuesta);   //creem el node de text amb el contingut de la variable 'resposta'
        objecte.appendChild(contingut);   //afegim el node
        document.body.appendChild(objecte);   //indiquem que 'objecte' es un fill de 'body'
    }
}

function borrarElement(){
    var objecte2 = document.getElementsByTagName("li");
    console.log(objecte2);
    
}