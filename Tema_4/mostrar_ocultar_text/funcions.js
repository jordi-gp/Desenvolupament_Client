window.onload = main;

function main(){
    document.getElementById("mostrar").addEventListener("click", mostrarParagraf);
    document.getElementById("ocultar").addEventListener("click", ocultarParagraf);
}

//Mostrar els dos paràgrafs
function mostrarParagraf(){
    var parag1 = document.getElementsByClassName("paragraf1");
    var parag2 = document.getElementsByClassName("paragraf2");

    var a = window.getComputedStyle(parag1[parag1.length -1], null).getPropertyValue("display");
    var b = window.getComputedStyle(parag2[parag2.length -1], null).getPropertyValue("display");
    
    if(a != "block"){
        console.log("no es display: block!");
    } else {
        console.log("yo me llamo ralph");
    }

}

//Ocultar els dos paràgrafs
function ocultarParagraf(){

}