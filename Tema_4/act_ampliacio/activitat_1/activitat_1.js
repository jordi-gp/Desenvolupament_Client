window.onload = main;

function main(){
    document.getElementById("iniciar").addEventListener("click", iniciar);
}

function iniciar(){
    var inici = 30;
    if(inici == 0){
        location.assign("https://uniwebsidad.com/");
    } else {
        setInterval(comprova, 1000);
    }
}

function comprova(inici){
    //var inici = 30;
    inici -= 1;
}