window.onload = main;

function main(){
    mostraNavegador();
    tamFinestra();
}

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

function tamFinestra(){
    var parag = document.getElementById("tamany");
    var altura = window.innerHeight;
    var amplaria = window.innerWidth;
    
    parag.appendChild(document.createTextNode("L'altura del navegador es de " + altura + " pixels"));
    parag.appendChild(document.createTextNode("L'altura del navegador es de " + amplaria + " pixels"));
    document.body.appendChild(parag);
}
