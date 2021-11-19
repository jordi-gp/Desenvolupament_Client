window.onload = main;

function main(){
    llistaProd();
}

var i = 0;
var confirmUsu;

function getLocalStrg(){
    //Obtenció del localStorage
    if(JSON.parse(localStorage.getItem("Usuari")) != null){
        confirmUsu = JSON.parse(localStorage.getItem("Usuari"));
    } else {
        //En cas de no haver-se registrar s'envia a l'usuari a la pàgina de registre
        alert("Has de crear un usuari abans per poder accedir a aquest apartat");
        window.location.assign("FDInici.html");
    }
}

//Funció per mostrar cada un dels elements que s'han seleccionat
function llistaProd(){
    getLocalStrg();

    var mainDiv = document.getElementById("articulos");

    if(confirmUsu.producte.length < 1){
        //mainDiv.setAttribute("id", "mainDiv");

        var noProduc = document.createElement("h3");
        var valNoProduc = document.createTextNode("No has seleccionat cap producte sapo");

        noProduc.appendChild(valNoProduc);
        mainDiv.appendChild(noProduc);

        //MOSTRAR EL PREU DEL PRODUCTE BUIT
        var preuTotal = document.getElementById("preuTot");
        var valPreuTot = document.createTextNode(" "+confirmUsu.total+"€");
        
        preuTotal.appendChild(valPreuTot);

    } else {
        var suma = 0;
        for(i=0; i < confirmUsu.producte.length; i++){
            //DIV 1
            var div1 = document.createElement("div");
            div1.setAttribute("class", "card mt-2");
            div1.setAttribute("id", "mainDiv"+i);
            div1.style.width = "25rem";

            mainDiv.appendChild(div1);

            //NOM DEL PRODUCTE A MOSTRAR
            var nomProd = document.createElement("h5");
            nomProd.setAttribute("class", "card-header");

            var valNomProd = document.createTextNode(confirmUsu.producte[i].nomProd);
            nomProd.appendChild(valNomProd);
            div1.appendChild(nomProd);

            //DIV 2
            var div2 = document.createElement("div");
            div2.setAttribute("class", "card-body");
            div1.appendChild(div2);

            //DIV 3
            var div3 = document.createElement("div");
            div3.setAttribute("class", "row");
            div2.appendChild(div3);

            //DIV 4
            var div4 = document.createElement("div");
            div4.setAttribute("class", "col");
            div3.appendChild(div4);

            //PREU DEL PRODUCTE A MOSTRAR
            var preuProd = document.createElement("h3");
            preuProd.setAttribute("class", "card-tittle");
            
            var valPreuProd = document.createTextNode(confirmUsu.producte[i].preuProd+"€");
            preuProd.appendChild(valPreuProd);
            div4.appendChild(preuProd);

            //TALLA DEL PRODUCTE A MOSTRAR
            var tallaProd = document.createElement("p");
            tallaProd.setAttribute("class", "card-text");

            var valTallaProd = document.createTextNode(confirmUsu.producte[i].tallaProd);
            tallaProd.appendChild(valTallaProd);
            div4.appendChild(tallaProd);

            //OPCIÓ PER BORRAR ELS ELEMENTS
            var a = document.createElement("a");
            a.setAttribute("href", "#");
            a.setAttribute("id", i);
            a.setAttribute("class", "btn btn-primary text-end");

            var elemI = document.createElement("i");
            elemI.setAttribute("class", "fa fa-trash-o");
            elemI.ariaHidden = true;

            a.addEventListener("click", function(){
                console.log(i);
                console.log(document.getElementById("mainDiv"+i));
            });
            a.appendChild(elemI);
            div4.appendChild(a);

            //APARTIR D'ACÍ ES S'APLIQUEN ELS ELEMENTS A div3
            var div5 = document.createElement("div");
            div5.setAttribute("class", "col");
            div3.appendChild(div5);

            //IMATGE DEL PRODUCTE AFEGIT
            var imgProd = document.createElement("img");
            var nombreProducte = confirmUsu.producte[i].nomProd.toLowerCase();
            imgProd.setAttribute("src", "./img/"+nombreProducte+".jpg");
            div3.appendChild(imgProd);

            //PREU TOTAL DE TOTS ELS PRODUCTES
            var preuTot = document.getElementById("preuTot");
            var valPreuTot = parseInt(confirmUsu.producte[i].preuProd);
            suma += valPreuTot;            
        }
        confirmUsu.total = suma;
        
        //console.log(confirmUsu);
        preuTot.append(" "+suma+"€");
    }
}

function eliminaProducte(){
    for(var i=0; i < confirmUsu.producte.length; i++){
        console.log(document.getElementById(i));
    }
}
