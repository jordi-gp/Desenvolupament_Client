window.onload = main;

function main() {
    compruebaLog();
    document.getElementById("enviar").addEventListener("click", cerrarSesion);
}

function cerrarSesion() {
    localStorage.removeItem("auth-token");
    compruebaLog();
}