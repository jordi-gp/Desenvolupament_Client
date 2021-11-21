$(document).ready(main);
    
function main(){
    $("#iniciar").click(iniciar);
}

var contador = 0;
var acerts = 0;
var reinici = false;

//Funció per iniciar el programa
function iniciar(){ 
    if(reinici == true){
        reiniciar();
    } else {
        mostraPregunta();
        mostraRespostes();
        $("#panel").show(1500);
        reinici = true;
    }
}

function reiniciar(){
    $("#panel").hide(1500);
    $("#pregunta").empty();
    $("#respostes").empty();
    $("#acerts").text("0");
    $("#total").text("0");
    $("#resultat").hide(1500);

    contador = 0;
    acerts = 0;

    reinici = false;
    $("#panel").show(1500);
    iniciar();
    
}

//Funció per mostrar la pregunta
function mostraPregunta(){
    $("#pregunta").append(test[contador].pregunta);
}

//Funció per mostrar les respostes
function mostraRespostes(){
    $("#postes").empty();
    $("#pregunta").html(test[contador].pregunta);
    $("#respostes").html("<ul id='valRespostes'>");
        for(var i=0; i < test[contador].respostes.length; i++){
            $("#valRespostes").append("<li id="+i+">"+test[contador].respostes[i]+"</li>");
        }
    contador++;

    canviaPregunta();

    $("#respostes").append("</ul>");
}

//Funció per canviar de pregunta
function canviaPregunta(){
    $("#valRespostes").click(function(){
        $("#panel").hide(1500);

        if(contador < 5){
            $("#panel").show(function(){
                mostraPregunta();
                mostraRespostes();
            });
        } else {
            $("#resultat").show(resultat());
        }

        validaPregunta();
    });
}

//Funció per validar la pregunta correcta
function validaPregunta(){
    console.log(contador);
    if(event.target.id == test[contador - 1].acert){
        acerts++;
        $("#acerts").text(acerts);
        $("#total").text(contador);
    } else {
        $("#total").text(contador);
    }
}

//Mostra el resultat i calcula la nota
function resultat(){
    var totAcerts = acerts + 1;
    const numPregunt = 5;
    var nota = (totAcerts/numPregunt)*10;
    $("#resultat").append("Has acertat un total de "+totAcerts+" preguntes sobre "+contador+"<br>");
    if(nota >= 5){
        $("#resultat").append("Enhorabona has aprovat!<br>");
        $("#resultat").append("La teva nota es un "+nota+" sobre 10.");
    } else {
        $("#resultat").append("Has suspés!<br>");
        $("#resultat").append("La teva nota es un "+nota+" sobre 10.");
    }
    
}
