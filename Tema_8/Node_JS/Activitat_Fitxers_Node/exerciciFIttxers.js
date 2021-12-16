const fs = require('fs');

//ruta del fitxer
var directorio = "./GeneradorDocuments";
//nom del fitxer
var fitxer = "/Plantilla.txt";
var info = "/basedades.csv";

var valAleatori = Math.floor(Math.random()*200);

//informacio del .csv
var arxiu = fs.readFileSync(directorio+info, "utf-8");
var arrInf = new Array();

//informacio del .txt
var document = fs.readFileSync(directorio+fitxer, "utf-8");
var arrAux = new Array();

var arrAux2 = new Array();

arxiu.split(/\r?\n/).forEach(function(line){
    arrInf.push(line);
    arrAux.push(line);
});


arrAux = arrInf[0].split(";");

arrAux2 = arrInf[1].split(";");

var a = "";

for(var i=0; i < arrAux2.length; i++){
    document = document.replace(arrAux[i], arrAux2[i]);
}

console.log(document);

//Comprovem si la carpeta 'resultat' ja existeix
if(fs.existsSync("resultat")){
    console.log("La carpeta ya existeix");
} else {
    //En cas de no existir la creem
    fs.mkdir("resultat", (error) => {
        if(error){
            console.log(error);
        } else {
            //Creem el fitxer .txt amb l'informacio
            console.log("El fitxer s'ha creat de foma correcta");
        }
    });
}

fs.appendFile("./resultat/"+arrAux2[1] +valAleatori+ ".txt", document, (error)=> {
    if(error) {
        throw error;
    } else {
        console.log("S'ha creat de forma correcta el jusfiticant");
    }
});