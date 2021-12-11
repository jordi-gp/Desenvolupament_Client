window.onload = main;

var arrCom = new Array();

function main(){
    
    carrega();
    document.getElementById("carrega_Prov").addEventListener("click", carrega);
    //Autobuscador realizado con 'jquery'
    $(function() {
        arrCom;
        
        $("#tags").autocomplete({
            source:arrCom
        });
        
    });
}

function cargaComunidadesCast() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var comunidades = JSON.parse(this.responseText);

            comunidades.data.forEach(element => {
                arrCom.push(element.DMUN50);
            });
        }
    }

    xmlhttp.open("GET", "https://apiv1.geoapi.es/municipios?CPRO=12&type=JSON&key=&sandbox=1");
    xmlhttp.send();
}

function cargaComunidadesVal(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var comunidades = JSON.parse(this.responseText);

            comunidades.data.forEach(element =>{
                arrCom.push(element.DMUN50);
            });
        }
    }

    xmlhttp.open("GET", "https://apiv1.geoapi.es/municipios?CPRO=46&type=JSON&key=&sandbox=1");
    xmlhttp.send();
}

function cargaComunidadesAlc(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var comunidades = JSON.parse(this.responseText);

            comunidades.data.forEach(element => {
                arrCom.push(element.DMUN50);
            });
        }    
    }
    xmlhttp.open("GET", "https://apiv1.geoapi.es/municipios?CPRO=03&type=JSON&key=&sandbox=1");
    xmlhttp.send(); 
}

function carrega(){
    cargaComunidadesCast();
    cargaComunidadesVal();
    cargaComunidadesAlc();
    
    console.log(arrCom.length);
    document.getElementById("info").innerHTML = "S'han carregat " + arrCom.length + " poblacions";
}