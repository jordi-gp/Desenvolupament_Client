window.onload = main;

function main(){
    llistaProd();
}

//Funció per mostrar cada un dels elements que s'han seleccionat
function llistaProd(){
    //Obtenció del localStorage
    if(JSON.parse(localStorage.getItem("Usuari")) != null){
        var confirmUsu = JSON.parse(localStorage.getItem("Usuari"));
    } else {
        window.location
    }

    console.log(confirmUsu);
}