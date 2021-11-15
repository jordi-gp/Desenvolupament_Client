$(document).ready(main);
    
function main(){
    iniciar();
}

var contador = 0;
var acerts = 0;
var reinici = true;

//Funció per iniciar el programa
function iniciar(){
    $("#iniciar").click(function(){
        mostraPregunta();
        mostraRespostes();
        $("#panel").show(1500);
    });
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
        //resultat();
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
