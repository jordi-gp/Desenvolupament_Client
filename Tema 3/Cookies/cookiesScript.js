window.onload = main;

function main(){

    var titul = document.getElementById("titol");
    
    if(document.cookie == "color=roig"){
        titul.style.color = "red";
        botons.style.display = "none";
    } else if (document.cookie == "color=verd"){
        titul.style.color = "green";
        botons.style.display = "none";
    } else if(document.cookie == "color=blau"){
        titul.style.color = "blue";
        botons.style.display = "none";
    }

    document.getElementById("confirmar").addEventListener("click", cambiaColor);
    document.getElementById("borrar").addEventListener("click", borrarCookie);
}

function cambiaColor(){
    
    var roig = document.getElementById("roig");
    var verd = document.getElementById("verd");
    var blau = document.getElementById("blau");
    var titul = document.getElementById("titol");
    var botons = document.getElementById("botons");

    if(roig.checked){
        titul.style.color = "red";
        document.cookie="color=roig";
        botons.style.display = "none";
        //alert(document.cookie);
    
    } else if(verd.checked){
        titul.style.color = "green";
        document.cookie="color=verd";
        botons.style.display = "none";
        //alert(document.cookie);
    
    } else if(blau.checked){
        titul.style.color = "blue";
        document.cookie="color=blau";
        botons.style.display = "none";
        //alert(document.cookie);
    } else {
        alert("Has de seleccionar un color!");
    }   
    
}

function borrarCookie(){
    document.cookie = "color= ; max-age=0;";
    alert("Les cookies han sigut borrades amb éxit!");
    location.reload();
}
