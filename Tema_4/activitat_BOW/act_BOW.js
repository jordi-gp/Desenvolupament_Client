window.onload = main;

function main(){
    mostraNavegador();
    tamFinestra();
    window.addEventListener("resize", tamFinestra);
    finestraEmergent();
    document.getElementById("bFinestra").addEventListener("click", function (){cambiaAlt()});
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

//Funció per mostrar el l'altura i amplària de la finestra en tot moment
function tamFinestra(){
    var altura = window.innerHeight;
    var amplaria = window.innerWidth;

    var parag1 = document.getElementById("altura");
    var parag2 = document.getElementById("amplaria");
    
    var texto1 = document.createTextNode("L'altura de la finestra es de " + altura + " pixels");
    var texto2 = document.createTextNode("L'amplària de la finestra es de " + amplaria + " pixels");

    parag1.appendChild(texto1);
    parag2.appendChild(texto2);
    
    document.body.appendChild(parag1);
    document.body.appendChild(parag2);

    parag1.replaceChildren(texto1, texto1);
    parag2.replaceChildren(texto2, texto2);
}

//Funció per obrir una nova finestra amb una amplària i altura de 200px
function finestraEmergent(){
    var finestra = window.open("http://localhost:5500/Tema_3/Formatar_Data/fecha.html", "","width=200, height=200");
}

//Funció per obrir una nova finestra amb altura i amplària definides per l'usuari
function cambiaAlt(){
    var alt = prompt("Quina altura desitges que tinga la nova finestra?");
    var amp = prompt("Quina amplaria desitges que tinga la nova finesra?");

    //Comprovació de que cap dels camps està buit o conté un valor que no es de tipus enter
    if(isNaN(alt) || isNaN(amp)){
        console.error("Algún dels dels dos camps no té un valor de tipus enter");
    } else if(alt == "" || amp == ""){
        console.error("Algún dels dos camps està buit");
    } else {
        window.open("http://localhost:5500/Tema_3/Formatar_Data/fecha.html", "", "width="+alt +","+ "height="+amp);
    }    
}
