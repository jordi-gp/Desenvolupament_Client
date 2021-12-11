window.onload = main;

var arrCom = new Array();

function main(){
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
            //console.log(comunidades.data.length);
            //console.log(arrCom.length);
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
            //console.log(comunidades.data.length);
            //console.log(arrCom.length);
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
            //console.log(comunidades.data.length);
            console.log(arrCom.length);            
        }    
    }
    xmlhttp.open("GET", "https://apiv1.geoapi.es/municipios?CPRO=03&type=JSON&key=&sandbox=1");
    xmlhttp.send(); 
}

function carrega(){

    if(arrCom.length <= 542){
        cargaComunidadesCast();
        cargaComunidadesVal();
        cargaComunidadesAlc();
        document.getElementById("info").innerHTML = "S'han carregat " + arrCom.length + " poblacions";
    }
}
    
    