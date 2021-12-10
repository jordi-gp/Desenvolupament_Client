window.onload = main;

var arrCom = new Array();

function main(){
    //Done: cargar las províncias de las diferentes apis
    cargaComunidadesCast();
    cargaComunidadesVal();
    cargaComunidadesAlc();

    //TODO: Guardar totes les provincies en un sol array
    //TODO: A partir del codi donat de jquery realitzar el buscador
}

function cargaComunidadesCast() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var comunidades = JSON.parse(this.responseText);

            comunidades.data.forEach(element => {
                //console.log(element.DMUN50);
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
                //console.log(element.DMUN50);
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
                console.log(element.DMUN50);
            });
        }
    }

    xmlhttp.open("GET", "https://apiv1.geoapi.es/municipios?CPRO=03&type=JSON&key=&sandbox=1");
    xmlhttp.send();
}