window.onload = main;

var comunitats = [{"comunitat":"Andalucia",
        "provincies":[
            "Almería",
            "Cádiz",
            "Córdoba",
            "Granada",
            "Jaén",
            "Huelva",
            "Málaga",
            "Sevilla"
    ]},
    {"comunitat":"Aragón",
        "provincies":[
            "Huesca",
            "Teruel",
            "Zaragoza"
    ]},
    {"comunitat":"Canarias",
        "provincies":[
            "Las Palmas",
            "Santa Cruz de Tenerife"
    ]},
    {"comunitat":"Cantabria",
        "provincies":[
            "Cantabria"
    ]},
    {"comunitat":"Castilla y León",
        "provincies":[
            "Ávila",
            "Burgos",
            "León",
            "Palencia",
            "Salamanca",
            "Segovia",
            "Soria",
            "Toledo",
            "Zamora"
    ]},
    {"comunitat":"Castilla-La Mancha",
        "provincies":[
            "Albacete",
            "Ciudad Real",
            "Cuenca",
            "Guadalajara",
            "Valladolid"
    ]},
    {"comunitat":"Cataluña",
        "provincies":[
            "Barcelona",
            "Lleida",
            "Girona",
            "Tarragona"
    ]},
    {"comunitat":"Ceuta",
        "provincies":[
            "Ceuta"
    ]},
    {"comunitat":"Comunidad Valenciana",
        "provincies":[
            "Alicante",
            "Castellón",
            "Valencia"
    ]},
    {"comunitat":"Comunidad de Madrid",
        "provincies":[
            "Madrid"
    ]},
    {"comunitat":"Extremadura",
        "provincies":[
            "Badajoz",
            "Cáceres"
    ]},
    {"comunitat":"Galicia",
        "provincies":[
            "La Coruña",
            "Lugo",
            "Ourense",
            "Pontevedra"
    ]},
    {"comunitat":"Islas Baleares",
        "provincies":[
            "Islas Baleares"
    ]},
    {"comunitat":"La Rioja",
        "provincies":[
            "La Rioja"
    ]},
    {"comunitat":"País Vasco",
        "provincies":[
            "Álava",
            "Guipúzcuoa",
            "Vizcaya"
    ]},
    {"comunitat":"Navarra",
        "provincies":[
            "Navarra"
    ]},
    {"comunitat":"Melilla",
        "provincies":[
            "Melilla"
    ]},
    {"comunitat":"Principado de Asturias",
        "provincies":[
            "Asturias"
    ]},
    {"comunitat":"Región de Murcia",
        "provincies":[
            "Murcia"
    ]}];

function main() {
    mostrarComunitats();
    mostrarProvincies();
    compara();
}

//Funció per mostrar les comunitats
function mostrarComunitats() {
    var selCom = document.getElementById("comunitats");

    comunitats.forEach((element, index) => {
        var op = document.createElement("option");
        var txt = document.createTextNode(element.comunitat);

        op.appendChild(txt);
        op.setAttribute("value", index);
        selCom.appendChild(op);

        //console.log(op);
    });
    provincies();
}

//Funció per mostrar les províncies
function mostrarProvincies(){
    var selProv = document.getElementById("provincies");
    var selCom = document.getElementById("comunitats").value;
    console.log(comunitats[selCom].provincies);

    comunitats[selCom].provincies.forEach((element, index) => {      
        //console.log(element.provincies.length);

        //for(var i=0; i < element.provincies.length; i++){
            //console.log(element.provincies[i]);
            var op = document.createElement("option");
            var txt = document.createTextNode(element);

            op.appendChild(txt);
            op.setAttribute("id", index);
            selProv.appendChild(op);
            //console.log(op);
        //}        
    });
}

//Funció per comparar les id's
function compara(){
    for(var i=0; i < comunitats.length; i++){
        var b = document.getElementById("4");
        //console.log(b);
    }
}

function provincies(){
    document.getElementById("comunitats").addEventListener("change", mostrarProvincies);
}