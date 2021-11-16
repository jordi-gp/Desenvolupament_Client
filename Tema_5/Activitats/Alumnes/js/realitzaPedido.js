window.onload = main;

function main(){
    mostraArticle();
}

contador = 1;

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
        selTalla.appendChild(valTalla);
        talles.appendChild(selTalla);
    }

    //Mostrar l'imatge del producte
    var imatge = document.getElementById("imagen");
    var valImatge = "./img/"+pedido[contador].imagen;

    imatge.setAttribute("src", valImatge);
    console.log(valImatge);
}