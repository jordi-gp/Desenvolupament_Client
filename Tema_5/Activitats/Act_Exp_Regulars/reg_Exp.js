window.onload = main;

function main(){
    document.getElementById("Enviar").addEventListener("click", validaDNI);
}

//Expressions regulars per validar
const DNI = new RegExp(/^\d{9}[A-Z]{1}$/);
const numTel = new RegExp(/^\d{3}\s\d{3,}\s\d{3}$/);
const data = new RegExp(/^\d[1970-2030]{4}+\-\d[1-12]{2}+\-\d[1-31]{2}$/);
const matrCotxe = new RegExp(/^\d\d\d\d\s[A-Z]{3}$/);
const email = new RegExp(/^\w+@\w+\.\w{2,3}$/);
const url = new RegExp(/^(ftp|http|https):\/\/[^ "]+\.\w{2,3}$/);

//Funció per validar el DNI
function validaDNI(){
    var dniVal = document.getElementById("DNI").value;

    if(DNI.test(dniVal)){
        validaTel();
        console.log(document.getElementById("data").value);
    } else {
        alert("El DNI ha de tindre un format correcte");
    }
}

//Funció per validar el telèfon
function validaTel(){
    var telVal = document.getElementById("tel").value;

    if(numTel.test(telVal)){
        validaData();
    } else {
        alert("El telèfon ha de tindre un format correcte");
    }
}

//Funció per validar la data
function validaData(){
    var telData = document.getElementById("data");

    if(data.test(telData)){
        validaMatr();
    } else {
        alert("La data ha de tindre un format correcte");
    }
}

//Funció per validar la matrícula
function validaMatr(){
    var matrVal = document.getElementById("matricula").value;

    if(matrCotxe.test(matrVal)){
        validaEmail();
    } else {
        alert("La matricula ha de tindre un format correcte");
    }
}

//Funció per validar el correu electrònic
function validaEmail(){
    var emailVal = document.getElementById("email").value;

    if(email.test(emailVal)){
        validaURL();
    } else {
        alert("El correu electrònic ha de tindre un format correcte");
    }
}

//Funció per validar el la URL
function validaURL(){
    var urlVal = document.getElementById("url").value;

    if(url.test(urlVal)){
        mostraDades();
        document.getElementById("form").reset();
    } else {
        alert("La URL ha de tindre un valor vàlid");
    }
}

//Funció per mostrar les dates del formulari
function mostraDades(){
    //Variables per obtindre els valors
    var dniVal = document.getElementById("DNI").value;
    var telVal = document.getElementById("tel").value;
    var dataVal = document.getElementById("data").value;
    var matrVal = document.getElementById("matricula").value;
    var emailVal = document.getElementById("email").value;
    var urlVal = document.getElementById("url").value;

    //Títol del camp
    var titol = document.createElement("h2");
    var titolCont = document.createTextNode("Informació del Formulari");
    titol.appendChild(titolCont);
    document.body.appendChild(titol);

    //Llista on es mostren els elements
    var list = document.createElement("ul");
    
    //Camp del DNI
    var contDNI = document.createTextNode("DNI => " + dniVal);
    var valList1 = document.createElement("li");
    valList1.appendChild(contDNI);
    list.appendChild(valList1);

    //Camp del número de telèfon
    var contTel = document.createTextNode("Número de Telèfon => " + telVal);
    var valList2 = document.createElement("li");
    valList2.appendChild(contTel);
    list.appendChild(valList2);

    //Camp de la Data
    var contData = document.createTextNode("Data => " + dataVal);
    var valList3 = document.createElement("li");
    valList3.appendChild(contData);
    list.appendChild(valList3);

    //Camp de la matrícula del cotxe
    contMatr = document.createTextNode("Matrícula => " + matrVal);
    var valList4 = document.createElement("li");
    valList4.appendChild(contMatr);
    list.appendChild(valList4);

    //Camp del correu electrònic
    contCorr = document.createTextNode("Correu Electrònic => " + emailVal);
    var valList5 = document.createElement("li");
    valList5.appendChild(contCorr);
    list.appendChild(valList5);

    //Camp de la URL
    contUrl = document.createTextNode("URL => " + urlVal);
    var valList6 = document.createElement("li");
    valList6.appendChild(contUrl);
    list.appendChild(valList6);

    document.body.appendChild(list);
}