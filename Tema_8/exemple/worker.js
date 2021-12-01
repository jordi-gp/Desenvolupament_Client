self.addEventListener("message", function(e){
    //console.log("el jefe diu ", e.data, " i si, JavaScript es millor que PHP");
    hora = new Date();
    this.self.postMessage("Qui diga que PHP es millor sen va al puto carrer" + hora);
});