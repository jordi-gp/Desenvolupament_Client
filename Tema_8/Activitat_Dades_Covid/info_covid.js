window.onload = main;

function main(){
    getFecha();
    cridaApi();
}

//Obtención de la fecha
function getFecha(){
    var meses = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    var fecha = new Date;

    var año = fecha.getFullYear();
    var mes = meses[fecha.getMonth()];
    var dia = fecha.getDate();

    if(dia < 10){
        dia = "0"+fecha.getDate();
    }

    var dataActual = año+"-"+mes+"-"+dia;
    console.log(dataActual);
}

//Obtención de información de la API
function cridaApi() {
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var info = JSON.parse(this.responseText);

            var totalInfec = document.getElementsByClassName("nous_infectats");
            var totalDef = document.getElementsByClassName("noves_defuncions");
            var nuevosInfec = document.getElementsByClassName("nous_infectats");
            var nuevasDef = document.getElementsByClassName("noves_defuncions");
            var ultimaAct = document.getElementsByClassName("ultima_act");

            for(var i=0; i < 3; i++){
                //var totalInfectats = info.dates[dataApi].countries.Spain.regions[7].sub_regions[i].today_confirmed;
                //var totalDefuncions = info.dates[dataApi].countries.Spain.regions[7].sub_regions[i].today_deaths;
                
                //totalInfec[i].innerHTML = totalInfectats;
                //totalDef[i].innerHTML = totalDefuncions;
            }
            console.log(info.dates[dataApi].countries.Spain.regions[6].sub_regions);
        }
    }
    xmlhttp.open("GET", "https://api.covid19tracking.narrativa.com/api/"+dataActual+"/country/spain");
    xmlhttp.send();
}
