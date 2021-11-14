$(document).ready(main);
    
function main(){
    //TODO -> mostrar les preguntes (done)
    mostraPregunta();
}

function mostraPregunta(){
    $("#iniciar").click(function() {
        $("#panel").show(1500);
        $("#pregunta").html(test[0].pregunta);
        mostraRespostes();
    });
}

function mostraRespostes(){
    $("#iniciar").css("display", "none");
    $("#respostes").append("<ul id='valRespostes'>");
        for(var i=0; i < test[0].respostes.length; i++){
            $("#valRespostes").append("<li id="+i+">"+test[0].respostes[i]+"</li>");
        }
    $("#respostes").append("</ul>");
}