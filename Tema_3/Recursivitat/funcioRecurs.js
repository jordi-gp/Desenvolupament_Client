window.onload = main;

var max = 50;
var min = 0;
var contador = 0;

function main() {
    document.getElementById("iniciar").addEventListener("click", actRecursivitat);
}

function actRecursivitat() {
    var numRandom = Math.floor(Math.random() * 50 + 0);
    presentacio(numRandom);
    recursivitat(numRandom, max, min, contador);
}

function presentacio(numRandom) {
    document.getElementById("valorMaxim").innerHTML = "Valor màxim => " + max;
    document.getElementById("valorMinim").innerHTML = "Valor mínim => " + min;
    document.getElementById("valAleatori").innerHTML = "Valor aleatori => " + numRandom;
}

function recursivitat(numRandom2, valMax, valMin, contador) {

    if (numRandom2 == 50) {
        alert("El nombre aleatori es 50!");

    } else {
        var valOp = Math.floor((parseInt(valMax) + parseInt(valMin)) / 2);
        contador++;

        if (valOp == numRandom2) {
            //console.log(contador);
            return document.getElementById("nIntentos").innerHTML = "Nombre d'intentos => " + contador;

        } else if (numRandom2 < valOp) {
            valMax = valOp;
            //console.log(valOp);
            return recursivitat(numRandom2, valMax, valMin, contador);

        } else if (numRandom2 > valOp) {
            valMin = valOp;
            //console.log(valOp);
            return recursivitat(numRandom2, valMax, valMin, contador);
        }
    }
}
