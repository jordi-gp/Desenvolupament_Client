window.onload = main;

function main(){
    document.getElementById('gravar').addEventListener('click', afegir);
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

                if (arrProductes.indexOf == -1){

                } else {
                    localStorage.setItem('producte',JSON.stringify(producte));
                    //console.log(JSON.parse(localStorage.getItem('producte')));
                    arrProductes.push(producte);

                    setTimeout(buidaForm, 1);
                }
            }
        }
    }
}

function buidaForm(){
    document.getElementById('formulari').reset();
}