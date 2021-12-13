window.onload = main;

function main(){
    if(JSON.parse(localStorage.getItem("Usuari")) != null) {
        mostraArticle();
        document.getElementById("talla").addEventListener("change", prevPre);
        document.getElementById("siguiente").addEventListener("click", afegirProducte);
    } else {
        sendToLogin();
    }
}

var contador = 0;

function sendToLogin(){
    var div = document.getElementById("totalProductes");
    div.style.display = "none";

    //En cas de no haver-se registrar s'envia a l'usuari a la pàgina de registre
        var p = document.createElement("h3");
        var valP = document.createTextNode("Has d'iniciar sessió per accedir a aquest apartat!");
        p.style.margin = "15px";
        p.append(valP);

        var tornaInici = document.createElement("a");
        var valInici = document.createTextNode("Iniciar Sessió");
        tornaInici.appendChild(valInici);
        tornaInici.style.margin = "15px";
        tornaInici.style.fontSize = "20px";
        tornaInici.setAttribute("href", "FDInici.html");

        document.body.appendChild(p);
        document.body.appendChild(tornaInici);
        //window.location.assign("FDInici.html");
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
    imatge.setAttribute("value", valImatge);

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
        var imgProd = document.getElementById("imagen");

        var newProduct = {
            nomProd: nomNewProduct.value,
            preuProd: preuNewProduct.value,
            tallaProd: tallaNewProduct.value,
            imgProd: imgProd.src
        }

        var suma=0;

        usuari.total += suma;
        console.log(usuari.total);

        usuari.producte.push(newProduct);
        localStorage.setItem("Usuari", JSON.stringify(usuari));
        canviaProducte();
    }
}

function prevPre(){
    if(JSON.parse(localStorage.getItem("Usuari")) != null){
        var usuari = JSON.parse(localStorage.getItem("Usuari"));
    }

    var talles = document.getElementById("talla");
    var selTalla = talles.options[talles.selectedIndex].value;
    var suma = 0;
    for(var i=0; i < usuari.producte.length; i++){
        var valPreu = parseInt(usuari.producte[i].preuProd);

        if(selTalla == "Talla"){
            valPreu -= suma;
            console.log(valPreu);
        } else {            
            console.log(suma+=valPreu);
        }
        
    }
    
}

function canviaProducte(){
    //event.preventDefault();
    if(contador < pedido.length){
        mostraArticle();
    } else {
        location.replace("FDConfirmar.html");
    }
}
