window.onload = main;

function main(){
    getFecha();
    cridaApi(dataActual);
}

//Obtención de la fecha
var dataActual;

function getFecha(){
    var meses = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    var fecha = new Date;

    var año = fecha.getFullYear();
    var mes = meses[fecha.getMonth()];
    var dia = fecha.getDate();

    if(dia < 10){
        dia = "0"+fecha.getDate();
    }

    dataActual = año+"-"+mes+"-"+dia;
    return dataActual;
}

//Obtención de información de la API
function cridaApi(dataActual) {
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var info = JSON.parse(this.responseText);

            var numRegio = 6;
            var infoObtinguda = info.dates[dataActual].countries.Spain.regions[numRegio].sub_regions;

            var totalInfec = document.getElementsByClassName("total_infectats");
            var totalDef = document.getElementsByClassName("total_defuncions");
            var nuevosInfec = document.getElementsByClassName("nous_infectats");
            var nuevasDef = document.getElementsByClassName("noves_defuncions");
            var ultimaAct = document.getElementsByClassName("ultima_act");

            for(var i=0; i < 3; i++){
                var todayConfirmed = infoObtinguda[i].today_confirmed;
                var todayDeaths = infoObtinguda[i].today_deaths;
                var newConfirmed = infoObtinguda[i].today_new_confirmed;
                var newDeaths = infoObtinguda[i].today_new_deaths;
                var lasAct = infoObtinguda[i].date;

                totalInfec[i].innerHTML = todayConfirmed;
                totalDef[i].innerHTML = todayDeaths;
                nuevosInfec[i].innerHTML = newConfirmed;
                nuevasDef[i].innerHTML = newDeaths;
                ultimaAct[i].innerHTML = lasAct;
            }
        }
    }
    xmlhttp.open("GET", "https://api.covid19tracking.narrativa.com/api/"+dataActual+"/country/spain");
    xmlhttp.send();
}
