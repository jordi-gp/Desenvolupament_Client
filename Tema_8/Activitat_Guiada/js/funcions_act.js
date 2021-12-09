function getVoto(int) {
    //Creació de l'objecte XMLHttpRequest
    xmlhttp = new XMLHttpRequest();

    //Funció anònima per determinar que s'han complit
    //els 4 estats i les respostes han sigut correcte
    xmlhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            document.getElementById("encuesta").innerHTML = this.responseText;
        }
    }
    //Enviament de l'informació obtinguda al fitxer '.php'
    //encarregat de processar l'informació
    xmlhttp.open("GET", "http://localhost/enquesta/enquesta_vot.php?voto="+int);
    xmlhttp.send();
}