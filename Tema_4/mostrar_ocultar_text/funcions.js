window.onload = main;

function main(){
    document.getElementById("mostrar").addEventListener("click", mostrarParagraf);
    document.getElementById("ocultar").addEventListener("click", ocultarParagraf);
}

//Mostrar els dos paràgrafs
function mostrarParagraf(){
    //Obtenim els elements amb les classes corresponents aplicades
    var parag1 = document.getElementsByClassName("paragraf1");
    var parag2 = document.getElementsByClassName("paragraf2");

    var b =[];

    //Obtenim la propietat 'display'
    var a = window.getComputedStyle(parag1[parag1.length -1], null).getPropertyValue("display");
    var b = window.getComputedStyle(parag2[parag2.length -1], null).getPropertyValue("display");
    
    //Realitzem una comparació, si el paragraf s'esta mostrant,
    //avisem a l'usuari de que ja està visible, en cas contrari l'ocultem
    if(a != "block"){
        parag1 = parag1[parag1.length -1];
        parag2 = parag2[parag2.length -1];

        parag1.style.display = "block";
        parag2.style.display = "block";
    } else {
        alert("El paràgraf ja esta siguent mostrat");
    }
}

//Ocultar els dos paràgrafs
function ocultarParagraf(){
    //Exactament el mateix codi que en la funció de dalt
    //pero en aquest cas serveix per ocultar el paràgraf en cas de no estar-ho
    var parag1 = document.getElementsByClassName("paragraf1");
    var parag2 = document.getElementsByClassName("paragraf2");

    var a = window.getComputedStyle(parag1[parag1.length -1], null).getPropertyValue("display");
    var b = window.getComputedStyle(parag2[parag2.length -1], null).getPropertyValue("display");
    
    if(a != "none"){
        parag1 = parag1[parag1.length -1];
        parag2 = parag2[parag2.length -1];

        parag1.style.display = "none";
        parag2.style.display = "none";
    } else {
        alert("El paràgraf ja esta ocult");
    }
}