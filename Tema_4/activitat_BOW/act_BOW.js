window.onload = main;

function main(){
    mostraNavegador();
    tamFinestra();
    finestraEmergent();
    document.getElementById("cambiaTamany").addEventListener("click", cambiaTamany());
}

//Funció per mostrar el navegador en el que ens trobem
function mostraNavegador(){
    /*
    *Netscape es el nom d'aplicació que es dona per a
    *Chrome, Firefox, IE11 i Safari (vist en w3schools)
    */
    var titol = document.getElementById("titol");
    var nomNav = navigator.appName;
    titol.appendChild(document.createTextNode(nomNav));
    document.body.appendChild(titol);
}

//Funció per mostrar el l'altura i amplària de la finestra
function tamFinestra(){
    var parag1 = document.getElementById("altura");
    var parag2 = document.getElementById("amplaria");

    var altura = window.innerHeight;
    var amplaria = window.innerWidth;
    
    parag1.appendChild(document.createTextNode("L'altura de la finestra es de " + altura + " pixels"));
    parag2.appendChild(document.createTextNode("L'amplària de la finestra es de " + amplaria + " pixels"));
    
    document.body.appendChild(parag1);
    document.body.appendChild(parag2);
}

//Funció per obrir una nova finestra amb una amplària i altura de 200px
function finestraEmergent(){
    //window.open("http://localhost:5500");
    //window.innerHeight = "200px";
    //window.innerWidth = "200px";
}

function cambiaTamany(){
    var altura = prompt("Quina altura desitges que tinga la finestra?");
    var amplaria = prompt("Quina amplària desitges que tinga la finestra?");

    var a = parseInt(altura);
}
