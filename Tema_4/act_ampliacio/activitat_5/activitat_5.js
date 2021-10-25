window.onload = main;

//Array amb les marques dels cotxes
var marques = ["Abarth","Dacia","Ferrari","BMW","Audi","Citroen","Chevrolet","Land Rover","Hyundai","Jaguar","Lexus","Mazda","Mini","Opel","Peugeot"];

function main(){
    llista();
    boto();
    document.getElementById("ordenar").addEventListener("click", ordenar);
}

//Mostrar el contingut en format de llista
function llista(){
    var ol = document.createElement("ol");
    ol.setAttribute("id", "llista");
    document.body.appendChild(ol);

    for(var i=0; i < marques.length; i++){
        var list = document.createElement("li");
        list.setAttribute("type", "square");
        list.setAttribute("id", "a");
        var text = document.createTextNode(marques[i]);

        list.appendChild(text);
        ol.appendChild(list);
    }
}

//Botó per donar l'ordre d'ordenar
function boto(){
    var but = document.createElement("button");
    var text = document.createTextNode("Ordenar Llista");

    but.setAttribute("id", "ordenar");
    but.appendChild(text);
    
    document.body.appendChild(but);
}

//Funció per ordenar i mostrar la nova llista
function ordenar(){
    var list = document.getElementById("llista");
    var bot = document.getElementById("ordenar");
    
    document.body.removeChild(list);
    document.body.removeChild(bot);
    
    marques.sort();
    
    llista();
    boto();
}