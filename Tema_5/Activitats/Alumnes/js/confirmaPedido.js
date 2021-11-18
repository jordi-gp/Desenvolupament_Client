window.onload = main;

function main(){
    llistaProd();
    document.getElementById("borraProducte").addEventListener("click", eliminaProducte);
}

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

    //console.log(confirmUsu.producte.length);

    var mainDiv = document.getElementById("articulos");

    for(var i=0; i < confirmUsu.producte.length; i++){
        console.log(confirmUsu.producte[i]);

        //DIV 1
        var div1 = document.createElement("div");
        div1.setAttribute("class", "card mt-2");
        div1.setAttribute("id", i);
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
        a.setAttribute("id", "borraProducte");
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
        imgProd.setAttribute("src", "./img/"+pedido[i].imagen);
        div3.appendChild(imgProd);

        //PREU TOTAL DE TOTS ELS PRODUCTES
        var preuTotal = confirmUsu.total;
        if(confirmUsu.producte[i].length > 1){
            var preuInt = parseInt(confirmUsu.producte[i].preuProd);
            preuTotal = preuInt + preuInt;
        console.log(preuTotal);
        } else {
            console.log(confirmUsu.producte[i].preuProd);
        }
        

    }
}

function eliminaProducte(){
    getLocalStrg();

    for(var i=0; i < confirmUsu.producte.length; i++){
        console.log()
    }
}