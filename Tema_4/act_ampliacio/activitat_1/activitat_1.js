window.onload = main;

var temps = 10;
var interval;

function main(){
    document.getElementById("iniciar").addEventListener("click", iniciar);
    document.getElementById("cancelar").addEventListener("click", cancelar);
}


function iniciar(){
    interval = setInterval(comprovar, 1000);
    console.log("a");
}

function comprovar(){
    if(temps > 0){
        temps -= 1;
        console.log(temps);
    } else {
        document.location = "https://google.es";
    }

    var p = document.getElementById("p");
    var va = document.createTextNode(temps);
    console.log(va);

    p.appendChild(va);

    document.body.appendChild(p);

    p.replaceChildren(va);

}

function cancelar(){
    clearInterval(interval);
    temps = 10;
}