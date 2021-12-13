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

            //console.log(info.dates.dataApi.countries);
            console.log(info.dates[dataApi].countries);
        }
    }
    xmlhttp.open("GET", "https://api.covid19tracking.narrativa.com/api/2020-03-22/country/spain");
    xmlhttp.send();
}