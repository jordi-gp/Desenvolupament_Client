window.onload = main;

function main(){
    document.getElementById("agrandar").addEventListener("click", agrandar);
    document.getElementById("original").addEventListener("click", original);
    document.getElementById("reducir").addEventListener("click", reduir);
}

//El text torna a tindre el tamany que tenía al principi
function original(){
    document.querySelector(".texto").style.fontSize = "20px";
}

//S'agranda el tamany del text en 0'05px
function agrandar(){
    var texto = document.querySelector("p");
    var a = window.getComputedStyle(texto, null).getPropertyValue("font-size");

    //Es converteix a enter per a poder obtindre el número sols
    a = parseInt(a);

    if(a < 40){
        texto.style.fontSize = (a + 5) + "px";
    } else {
        window.alert("S'ha arrivat al llímit de grandària del text");
    }
}

//Es redueix el tamany del text en 0'05px
function reduir(){
    var texto = document.querySelector("p");
    var a = window.getComputedStyle(texto, null).getPropertyValue("font-size");

    //Es converteix a enter per a poder obtindre el número sols
    a = parseInt(a);

    if(a > 10){
        texto.style.fontSize = (a - 5) + "px";
    } else {
        window.alert("S'ha arrivat al llímit de grandària del text");
    }
}