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
}

function mostrarComunitats() {
    var sel = document.getElementById("comunitats");

    comunitats.forEach(element => {
        var op = document.createElement("option");
        var txt = document.createTextNode(element.comunitat);

        op.appendChild(txt);
        sel.appendChild(op);

    });

    comunitats.forEach(element => {
        //console.log(element.provincies.length);
        for(var i=0; i < element.provincies.length; i++){
            console.log(element.comunitat + " " + element.provincies[i]);
        }
    });

}