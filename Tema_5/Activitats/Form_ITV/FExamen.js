window.onload = main;

function main(){
    //mostraEstacions();
    afigEvent();
}

//Declaració de les expressions regulars utilitzades
const expRegMatr = new RegExp(/^([A-Z]{1}[0-9]{4}[A-Z]{2})|([0-9]{4}[A-Z]{3})|([A-Z]{1}[0-9]{4}[A-Z]{3})$/);

//CAMP D'ESTACIÓ D'ITV
function afigEvent(){
    var radButtons = document.getElementsByName("provincia");

    for(var i=0; i < radButtons.length; i++){
        radButtons[i].addEventListener("change", mostraEstacions);
    }
}

function mostraEstacions(){
    var radButtons = document.getElementsByName("provincia");
    var sel = document.getElementById("estacio");
    
    do {
        sel.lastChild.parentNode.removeChild(sel.lastChild);
    } while(sel.lastChild != null);

    radButtons.forEach((element, index) => {
        if(element.checked){
            for(var i=0; i < estacions[index].estacio.length; i++){
                var op = document.createElement("option");
                var txt = document.createTextNode(estacions[index].estacio[i]);

                op.appendChild(txt);
                op.setAttribute("id", i);
                sel.appendChild(op);
            }
        }
    });
}

//CAMP DE VALIDACIÓ DE MATRICULA
function validaMatricula(){
    var matrVal = document.getElementById("matricula");


}