$(document).ready(main);
    
function main(){
    iniciar();
}

var contador = 0;
var acerts = 0;
var reinici = true;

//Funció per iniciar el programa
function iniciar(){
    if(reinici = true){
        
    }
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
    if(event.target.id == test[contador - 1].acert){
        acerts++;
        $("#acerts").text(acerts);
        $("#total").text(contador);
    } else {
        $("#total").text(contador);
    }
}

function resultat(){
    var nota = acerts/5;
    $("#resultat").append("Has acertat un total de "+acerts+" preguntes sobre "+contador+"<br>");
    $("#resultat").append("La teva nota es de "+nota);
}
