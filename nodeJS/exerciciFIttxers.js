const readline = require('readline');
const fs = require('fs');

//ruta del fitxer
var directorio = "./GeneradorDocuments";
//nom del fitxer
var fitxer = "/Plantilla.txt";
var info = "/basedades.csv";

var justificant = {
    nomPare: "",
    nomAlumne: "",
    curs: "",
    grup: "",
    diaInici: 0,
    mesInici: "",
    anyInici: 0,
    diaFi: 0,
    mesFi: "",
    mesFi2: 0,
    diaFalta: "",
    mesFalta: "",
    anyFalta: "",
    totDia: "",
    horesDia: "",
    horaInici: "",
    horaFi: "",
    motiu: "",
    diaActual: 0,
    mesActual: "",
    anyActual: 0
}

//llista els elements del directori
var fitxers = fs.readdirSync(directorio);

//llista el contingut del fitxer
var arxiu = fs.readFileSync(directorio+info, "utf-8");

console.log(arxiu.split(";"));

//Comprovem si la carpeta 'resultat' ja existeix
if(fs.existsSync("resultat")){
    console.log("La carpeta ya existeix");
} else {
    //En cas de no existir la creem
    fs.mkdir("resultat", (error) => {
        if(error){
            console.log(error);
        } else {
            console.log("El fitxer s'ha creat de forma correcta");
        }
    });
}