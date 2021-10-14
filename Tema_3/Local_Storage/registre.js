window.onload = main;

function main(){
    document.getElementById("Enviar").addEventListener("click", comprobacio);
}



function comprobacio(){

    var nom = document.getElementById("usuari").value;
    var contrasenya = document.getElementById("Contrasenya").value;
    var logInf = JSON.parse(localStorage.getItem("usuario"));

    var usuario ={
        nombre: nom,
        contrasenya: contrasenya
    }

    if(logInf == null){
        localStorage.setItem("usuario", JSON.stringify(usuario));
        document.write("Benvingut!");
    } else {
        if(logInf.nombre != usuario.nombre){
            alert("El nombre introducido no es el correcto!!");
        } else {
            if(logInf.contrasenya == usuario.contrasenya){
                alert("La contrasenya introducida es correcta!");
                document.write("Login realitzat de forma correcta!")
            } else {
                alert("La contrasenya introducida es incorrecta!");
            }
        }
        
    }
    
}
