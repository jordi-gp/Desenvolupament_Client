window.onload = main;

function main(){
    if(JSON.parse(localStorage.getItem("Usuari")) != null){
        llistaProd();
        eliminaProducte();
    } else {
        sendToLogin();
    }
    
}

var i = 0;
var confirmUsu;

function getLocalStrg(){
    //Obtenció del localStorage
    if(JSON.parse(localStorage.getItem("Usuari")) != null){
        confirmUsu = JSON.parse(localStorage.getItem("Usuari"));
    }
}

function sendToLogin(){
    var div = document.getElementById("productes");
    div.style.display = "none";

    //En cas de no haver-se registrar s'envia a l'usuari a la pàgina de registre
        var p = document.createElement("h3");
        var valP = document.createTextNode("Has d'iniciar sessió per accedir a aquest apartat!");
        p.style.margin = "15px";
        p.append(valP);

        var tornaInici = document.createElement("a");
        var valInici = document.createTextNode("Iniciar Sessió");
        tornaInici.style.margin = "15px";
        tornaInici.style.fontSize = "20px";
        tornaInici.appendChild(valInici);

        tornaInici.setAttribute("href", "FDInici.html");

        document.body.appendChild(p);
        document.body.appendChild(tornaInici);
        //window.location.assign("FDInici.html");
}

//Funció per mostrar cada un dels elements que s'han seleccionat
function llistaProd(){
    getLocalStrg();

    var mainDiv = document.getElementById("articulos");

    if(confirmUsu.producte.length < 1){
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
        preuTot.append(" "+suma+"€");
    }
}

function eliminaProducte(){
    var botons = document.querySelectorAll(".btn.btn-primary.text-end");

    botons.forEach(boton =>{
        boton.addEventListener("click", borraProducte);
    });
}

//Funció per eliminar els productes i actualitzar el preu i l'objecte
//del localStorage
function borraProducte(){
    var prodSelected = document.getElementById("mainDiv"+this.id);
    prodSelected.remove();
    confirmUsu.producte.splice(this.id, 1);

    if(confirmUsu.producte.length == 0){
        confirmUsu.total = 0;
    }

    newUsu();
    location.reload();
}

//Creació d'un nou usuari per actualitzar el nombre de productes en l'array
function newUsu(){
    localStorage.setItem("Usuari", JSON.stringify(confirmUsu));
}
