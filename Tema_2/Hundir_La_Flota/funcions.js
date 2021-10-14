//Definició de partides
var p1 = {
    B2: [98, 99],
    B3: [01, 02, 03],
    B4: [06, 07, 08, 09],
    B5: [21, 22, 23, 24, 25]
}

var p2 = {
    B2: [04, 05],
    B3: [10, 11, 12],
    B4: [45, 46, 47, 48],
    B5: [95, 96, 97, 98, 99]
}

var p3 = {
    B2: [01, 02],
    B3: [22, 23, 24],
    B4: [50, 51, 52, 53],
    B5: [90, 91, 92, 93, 94]
}

var partides = [p1, p2, p3];
var valor;
var acert = 0;
var fallo = 0;
var comptador = 0;

window.onload = main;

function main() {
    pintarTablero();
    coordenadaHoritzontal();
    coordenadaVertical();
    document.getElementById("confirmar").addEventListener("click", dispar);
    document.getElementById("partidaNova").addEventListener("click", novaPartida);

}

function pintarTablero() {

    var campo = document.getElementById("campo");
    var altura = 10;
    var amplaria = 10;

    var aux = "<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th>I</th><th>J</th></tr>";


    for (i = 0; i < amplaria; i++) {
        aux += "<tr><th>" + (i + 1) + "</th>";

        for (j = 0; j < altura; j++) {
            aux += "<td id=" + i + j + ">X</td>"
            //console.log(i,j);
        }
        aux += "</tr>";
    }
    campo.innerHTML = aux;

}

function coordenadaHoritzontal() {

    var menu = document.getElementById("posHoritzontal");

    for (i = 65; i <= 74; i++) {
        var coordenada = i - 65;
        //console.log(coordenada);
        menu.innerHTML += "<option value =" + coordenada + ">" + String.fromCharCode(i) + "</option>";
    }

}

function coordenadaVertical() {

    var menu = document.getElementById("posVertical");

    for (i = 1; i <= 10; i++) {
        var coordenada = i - 1;
        //console.log(i);
        menu.innerHTML += ("<option value=" + coordenada + ">" + i + "</option>");
    }

}

function dispar() {

    var posVertical = document.getElementById("posVertical");
    var posHoritzontal = document.getElementById("posHoritzontal");
    var coordenada = posVertical.value + posHoritzontal.value;

    console.log(posHoritzontal.value, posVertical.value);

    if (document.getElementById(posVertical.value + posHoritzontal.value).innerText == "X") {
        for (var x in partides[valor]) {
            //console.log(partides[valor][x]);

            partides[valor][x].forEach(element => {
                //console.log(element);

                if (coordenada == element) {
                    document.getElementById(posVertical.value + posHoritzontal.value).innerHTML = x;
                    acert++;

                    if(acert > 1){
                        fallo--;
                    }

                } else {
                    comptador++;

                    if (comptador >= 14) {
                        document.getElementById(posVertical.value + posHoritzontal.value).innerHTML = "";
                        fallo = fallo + (comptador - 13);
                        comptador = 0;
                    }
                }
            });
        }
    }

    console.log("nombre de fallos:" + fallo);
    console.log("nombre d'acerts:" + acert);

    document.getElementById("mostrarAcerts").innerHTML = "Nombre d'acerts =>" + acert;
    document.getElementById("mostrarFallos").innerHTML = "Nombre de fallos =>" + fallo;

    if (acert == 14) {
        window.alert("HAS GUANYAT");
    } else if (fallo == 10) {
        window.alert("HAS PERDUT!");
    }

}

function novaPartida() {

    pintarTablero();
    acert = 0;
    fallo = 0;

    valor = Math.floor(Math.random() * partides.length);
    console.log("S'esta jugant la partida número " + valor);

    console.log(partides[valor]);


}