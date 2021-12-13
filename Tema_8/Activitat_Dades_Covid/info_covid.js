window.onload = main;

function main(){
    cridaApi();
    
}

/*TODO:Cridar a l'api per poder obtindre l'informació*/
function cridaApi() {
    /*Informació que anem a treure de l'arxiu JSON obtés de l'API*/
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var info = JSON.parse(this.responseText);
            var dataApi = "2020-03-22";

            var totalInfec = document.getElementsByClassName("nous_infectats");
            var totalDef = document.getElementsByClassName("noves_defuncions");

            for(var i=0; i < 3; i++){
                console.log(info.dates[dataApi].countries.Spain.regions[7].sub_regions);

                var totalInfectats = info.dates[dataApi].countries.Spain.regions[7].sub_regions[i].today_confirmed;
                var totalDefuncions = info.dates[dataApi].countries.Spain.regions[7].sub_regions[i].today_deaths;
                
                totalInfec[i].innerHTML = totalInfectats;
                totalDef[i].innerHTML = totalDefuncions;
            }
        }
    }
    xmlhttp.open("GET", "https://api.covid19tracking.narrativa.com/api/2020-03-22/country/spain");
    xmlhttp.send();
}
