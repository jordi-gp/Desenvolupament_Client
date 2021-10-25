window.onload = main;

var temps = 31;
var interval;

function main(){
    document.getElementById("iniciar").addEventListener("click", iniciar);
    document.getElementById("cancelar").addEventListener("click", cancelar);
}

//Funció per iniciar el contador
function iniciar(){
    interval = setInterval(comprovar, 1000);
}

//Funció per comprovar que el temps no s'ha acabat
function comprovar(){
    if(temps > 0){
        temps -= 1;
        console.log(temps);

        var par = document.getElementById("contador");
        var temp = document.createTextNode(temps);

        par.appendChild(temp);
        document.body.appendChild(par);

        par.replaceChildren(temp);

    } else {
        document.location = "https://google.es";
    }
}

//Cancelació del temporitzador
function cancelar(){
    clearInterval(interval);
    temps = 30;
}
