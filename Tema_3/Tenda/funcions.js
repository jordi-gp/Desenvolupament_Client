window.onload = main;

function main(){
}

function afegir(){

    var desc = document.getElementById('campDesc').value;
    var preu = document.getElementById('campPreu').value;
    var quantitat = document.getElementById('campQuant').value;

    var producte ={
        descripcio: desc,
        preu: preu,
        quantitat: quantitat
    }

    var arrProductes = [];

    if (desc == ''){
        alert('S\'han d\'indicar la descripció');
    
    } else {

        if (preu == ''){
            alert('S\'han d\'indicar el preu');
        
        } else {
        
            if(quantitat == ''){
                alert('S\'han d\'indicar la quantitat');
            
            } else {

                if(JSON.parse(localStorage.getItem("productes")) != null){
                    arrProductes = JSON.parse(localStorage.getItem("productes"));
                }                
                
                arrProductes.push(producte);
                localStorage.setItem("productes", JSON.stringify(arrProductes));
                setTimeout(buidaForm, 1);
                mostrarProductes();
            }
        }
    }
}

function buidaForm(){
    document.getElementById('formulari').reset();
}

function mostrarProductes(){
    var arrProductes = [];

    if(JSON.parse(localStorage.getItem("productes")) != null){
        arrProductes = JSON.parse(localStorage.getItem("productes"));
    } 

    var llista = document.getElementById("basquet");
    llista.innerHTML = "";
    var aux = "";

    var descripcio="<tr><th></th><th>Descripció</th><th>Preu</th><th>Quantitat</th></tr>";
    llista.innerHTML += descripcio;

    arrProductes.forEach( (producte, index) => {
            aux = "<tr><td><button id=\""+index+ "\" onclick=\" afegirProductes(this) \">Afegir</button></td><td> "+producte.descripcio+"</td><td> "+producte.preu+"€"+" </td><td> "+producte.quantitat+" </td><br></tr>";
            llista.innerHTML += aux;
    });

}


function afegirProductes(botoId){

    var arrProductes = [];
    var arrBasquet = [];
    var id = botoId.id;

    console.log(id);

    if(JSON.parse(localStorage.getItem("basquet")) != null){
        arrBasquet = JSON.parse(localStorage.getItem("basquet"));
    }

    if(JSON.parse(localStorage.getItem("basquet")) != null){
        arrBasquet = JSON.parse(localStorage.getItem("basquet"));
    }

    arrProductes = JSON.parse(localStorage.getItem("productes"));
    arrBasquet = JSON.parse(localStorage.getItem("basquet"));

    console.log(arrProductes[id]);


    var taulaBasquet = document.getElementById("taulaProductes");
    var aux2 = "";
    aux2 += "<tr><th></th><th>"+ arrProductes[id].descripcio +"</th><th>"+ arrProductes[id].quantitat +"</th><th>"+ arrProductes[id].preu +"</th></tr>";
    taulaBasquet.innerHTML += aux2;

    var valorFinal=0;

    var valor = parseFloat(arrProductes[id].preu);
    valorFinal = valorFinal + valor;
    document.getElementById("preu").innerHTML = "Preu Total => " + valorFinal + "€";

    arrBasquet.push(arrProductes[id]);
    localStorage.setItem("Basquet", JSON.stringify(arrBasquet));


}