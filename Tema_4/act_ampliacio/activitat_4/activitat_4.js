window.onload = main;

function main(){
    document.getElementById("busca").addEventListener("click", busca);
}

function busca(){
    var par = prompt("Quina paraula desitges buscar");

    var a =document.getElementById("p");

    var index = a.textContent.includes(par);

    if(index === true){
        for(var i=0; i < a.textContent.length; i++){
            
        }
    } else {
        alert("No s'ha trobat la paraula");
    }
    
    
}