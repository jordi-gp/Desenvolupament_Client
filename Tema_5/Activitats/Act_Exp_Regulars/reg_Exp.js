window.onload = main;

function main(){
    document.getElementById("Enviar").addEventListener("click", validar);
}

//Expressions regulars per validar
const DNI = new RegExp(/^\d{9}[A-Z]{1}$/);
const numTel = new RegExp(/^\d{3}\s\d{3,}\s\d{3}$/);
const data = new RegExp(/^(19[7-9][0-9]|20[0-1][0-9]|202[0-1])-([0][1-9]||[1][0-2])-([0][1-9]||[1-2][0-9]||[3][0-1])$/);
const matrCotxe = new RegExp(/^\d{4}\s[A-Z]{3}$/);
const email = new RegExp(/^\w+@\w+\.\w{2,3}$/);
const url = new RegExp(/^(ftp|http|https):\/\/[^ "]+\.\w{2,3}$/);

//Funció per validar el DNI
function validaDNI(){
    var dniVal = document.getElementById("DNI");

    if(DNI.test(dniVal.value)){
        return true;
    } else {
        error2(dniVal, "El DNI introduit no es correcte!");
        return false;
    }
}

//Funció per validar el telèfon
function validaTel(){
    var telVal = document.getElementById("tel");

    if(numTel.test(telVal.value)){
        return true;
    } else {
        error2(telVal, "El telèfon introduit no es correcte!");
        return false;
    }
}

//Funció per validar la data
function validaData(){
    var telData = document.getElementById("data");

    if(data.test(telData.value)){
        return true;
    } else {
        error2(telData, "La data introduida no es correcta!");
        return false;
    }
}

//Funció per validar la matrícula
function validaMatr(){
    var matrVal = document.getElementById("matricula");

    if(matrCotxe.test(matrVal.value)){
        return true;
    } else {
        error2(matrVal, "La matrícula introduida no es correcta");
        return false;
    }
}

//Funció per validar el correu electrònic
function validaEmail(){
    var emailVal = document.getElementById("email");

    if(email.test(emailVal.value)){
        return true;
    } else {
        error2(emailVal, "El correu electrònic introduit no es correcte");
        return false;
    }
}

//Funció per validar el la URL
function validaURL(){
    var urlVal = document.getElementById("url");

    if(url.test(urlVal.value)){
        return true;
    } else {
        error2(urlVal, "L'URL introduida no es correcta");
        return false;
    }
}

//Funció per mostrar els missatges d'error
function error2 (element, missatge){
    document.getElementById("missatgeError").innerHTML = missatge;
    element.className = "error";
    element.focus();
}

//Funció per eliminar els errors
function esborrarError(){
    var formulari = document.forms[0];

    for(var i=0; i < formulari.elements.length; i++){
        formulari.elements[i].className="";
    }

    document.getElementById("missatgeError").innerHTML="";
}

//Funció per comprovar que es vol enviar el formulari
function validar(e){
    esborrarError();

    if(validaDNI() && validaTel() && validaData() && validaMatr() && validaEmail() && validaURL() && confirm("Confirma si vols enviar el formulari")){
        mostraDades();
        return true;
    } else {
        e.preventDefault();
        return false;
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