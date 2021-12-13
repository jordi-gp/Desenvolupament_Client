window.onload = main;

var arrCom = new Array();

function main(){
    document.getElementById("carrega_Prov").addEventListener("click", carrega);
}

function cargaComunidades(provincia){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var comunidades = JSON.parse(this.responseText);

            comunidades.data.forEach(element => {
                arrCom.push(element.DMUN50);
            });
            console.log(arrCom);
            filtrar();
            document.getElementById("info").innerHTML = "S'han carregat " + arrCom.length + " poblacions";
        }    
    }
    xmlhttp.open("GET", "https://apiv1.geoapi.es/municipios?CPRO="+provincia+"&type=JSON&key=&sandbox=1");
    xmlhttp.send();
}

function carrega(){

    arrCom = [];

    cargaComunidades('12');
    cargaComunidades('46');
    cargaComunidades('03');
}

//Autobuscador realizado con 'jquery'
function filtrar() {       
    $("#tags").autocomplete({
        source:arrCom
    });
};
    