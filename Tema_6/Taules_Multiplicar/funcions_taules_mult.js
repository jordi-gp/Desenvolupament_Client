$(document).ready(main);

function main(){
    tabla();
}

function tabla(){
    var div = $("<div></div>");
    var tabla = $("<table></table>");

    $("body").append(div);
    $(div).append(tabla);

    $(tabla).css("margin", "auto");
    $(tabla).css("border", "1px solid black");
    $(tabla).css("border-collapse", "collapse");

    for(var i=0; i <= 10; i++){
        for(var j=0; j <= 10; j++){
            var files = $("<tr></tr>");
            var fila1 = $("<td></td>").text(i);
            var fila2 = $("<td></td>").text(j);
            var fila3 = $("<td></td>").text(i*j);

            $(tabla).append(files);
            $(files).append(fila1);
            $(files).append(fila2);
            $(files).append(fila3);

            $("tr").filter(":odd").css("background-color", "lightblue");
            $("td").css("text-align", "center");
        }
    }
}
