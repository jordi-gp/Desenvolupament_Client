$(document).ready(main);

function main(){
    multiplicar();
}

function multiplicar(){
    //Número de la taula
    for(var i=0; i <= 10; i++){
        //Bloc div
        var div = $("<div></div>");
        $(div).css("display", "inline-block");
        $("body").append(div);
        
        //Taula
        var tabla = $("<table></table>");
        $(tabla).css("border", "1px solid black");
        $(tabla).css("margin", "5px");
        $(div).append(tabla);

        //Files
        var files = $("<tr></tr>");
        $(tabla).append(files);

        //Contingut de les files
        var valFiles = $("<th></th>").text("Taula de multiplicar del "+i);
        $(files).append(valFiles);
        
        //Multiplicadors
        for(var j=0; j <= 10; j++){
            //console.log(i+"x"+j+"="+i*j);
            var filesRes = $("<tr></tr>");
            $(tabla).append(filesRes);

            var operacio = i*j;
            var valFilesRes = $("<td></td>").text(i+"x"+j+"="+operacio);
            
            $(filesRes).append(valFilesRes);

            $("tr").filter(":odd").css("background-color", "lightblue");
        }
    }
}