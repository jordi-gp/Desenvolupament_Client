window.onload = main;

function main(){
    getUsuari();
    mostraArticle();
    document.getElementById("siguiente").addEventListener("click", canviaProducte);
}

var contador = 0;

function getUsuari(){

    if(JSON.parse(localStorage.getItem("Usuari")) != null){
        var newUsu = JSON.parse(localStorage.getItem("Usuari"));
    }

    var mostraNomUsu = document.getElementById("nombreApellidos");
    var valNomUsu = document.createTextNode(newUsu["nomUsu"]);

    mostraNomUsu.appendChild(valNomUsu);

}

function mostraArticle(){

    //Mostrar el nom del producte
    var article = document.getElementById("nombreArticulo");
    var valArticle = pedido[contador].nombreArticulo;

    article.setAttribute("value", valArticle);

    //Mostrar el preu del producte
    var preu = document.getElementById("precioArticulo");
    var valPreu = pedido[contador].precioArticulo;

    preu.setAttribute("value", valPreu);

    //Mostrar les talles del producte
    var talles = document.getElementById("talla");
    
    for(var i=0; i < pedido[contador].tallas.length; i++){
        var selTalla = document.createElement("option");
        var valTalla = document.createTextNode(pedido[contador].tallas[i]);
        var valValue = pedido[contador].tallas[i];

        selTalla.appendChild(valTalla);
        selTalla.setAttribute("value", valValue);

        talles.appendChild(selTalla);
    }

    //Mostrar l'imatge del producte
    var imatge = document.getElementById("imagen");
    var valImatge = "./img/"+pedido[contador].imagen;

    imatge.setAttribute("src", valImatge);

    contador++;
}    

function canviaProducte(){
    if(contador < 4){
        mostraArticle();
    } else {
        window.location.assign("FDConfirmar.html");
    }
}
