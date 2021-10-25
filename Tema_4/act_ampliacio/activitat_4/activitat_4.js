window.onload = main;

function main(){
    document.getElementById("busca").addEventListener("click", busca);
}

function busca(){
    var par = prompt("Quina paraula desitges buscar");

    var a = document.getElementById("p");
    var index = a.textContent.indexOf(par);

    if(index >= 0){
        alert("La paraula " +par+ " es troba al text");
        
        /*console.log(index);
        for(var i=0; i <= index; i++){
            console.log(a.textContent[i]);
            
        }*/
    } else {
        alert("No s'ha trobat la paraula");
    }
}