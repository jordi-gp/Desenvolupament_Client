window.onload = main;

function main(){
    document.getElementById("busca").addEventListener("click", busca);
}

function busca(){
    var par = prompt("Quina paraula desitges buscar");

    var a =document.getElementsByTagName("le");
    var b = "";

    for(var i=0; i < a.length; i++){
        console.log(a[i]);
    }
}