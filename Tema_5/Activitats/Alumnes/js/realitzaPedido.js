window.onload = main;

function main(){
    getUsuari();
    mostraArticle();
    document.getElementById("siguiente").addEventListener("click", afegirProducte);
}

var contador = 1;

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

    //Elimina le talles del producte anterior
    do {
        talles.lastChild.parentNode.removeChild(talles.lastChild);
    } while (talles.lastChild != null);
    
    var talla = document.createElement("option");
    var valTalla = document.createTextNode("Talla");

    talla.appendChild(valTalla);
    talla.setAttribute("value", "Talla");
    talles.appendChild(talla);

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

function afegirProducte(e){
    e.preventDefault();
    var talles = document.getElementById("talla");

    var selectedTalla = talles.options[talles.selectedIndex].value;
    
    if(selectedTalla == "Talla"){
        canviaProducte();
    } else {
        //Obtenció del localStorage
        if(JSON.parse(localStorage.getItem("Usuari")) != null){
            var usuari = JSON.parse(localStorage.getItem("Usuari"));
        }

        //Creació de l'objecte de tipus producte
        var nomNewProduct = document.getElementById("nombreArticulo");
        var preuNewProduct = document.getElementById("precioArticulo");
        var tallaNewProduct = document.getElementById("talla");

        var newProduct = {
            nomProd: nomNewProduct.value,
            preuProd: preuNewProduct.value,
            tallaProd: tallaNewProduct.value
        }

        usuari.producte.push(newProduct);
        localStorage.setItem("Usuari", JSON.stringify(usuari));
        canviaProducte();
    }
}


function canviaProducte(){
    //event.preventDefault();
    if(contador < pedido.length){
        mostraArticle();
    } else {
        window.location.assign("FDConfirmar.html");
    }
}
