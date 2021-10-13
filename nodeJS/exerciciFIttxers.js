const { strictEqual } = require('assert');
const fs = require('fs');

//ruta del fitxer
var directorio = "./GeneradorDocuments";
//nom del fitxer
var fitxer = "/Plantilla.txt";
var info = "/basedades.csv";

//informacio del .csv
var arxiu = fs.readFileSync(directorio+info, "utf-8");
var arrInf = new Array();

//informacio del .txt
var document = fs.readFileSync(directorio+fitxer, "utf-8");
var arrAux = new Array();

arxiu.split(/\r?\n/).forEach(function(line){
    arrInf.push(line);
});



for(i=0; i < arrInf.length; i++){
    var a = document.replace(arrInf[i].split(";"), arrInf[i].split(";")); 
}



console.log(a);

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