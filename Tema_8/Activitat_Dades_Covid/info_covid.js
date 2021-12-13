window.onload = main;

function main(){

}

/*TODO:Cridar a l'api per poder obtindre l'informació*/
function cridaApi(comunitat) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var info = JSON.parse(this.responseText);
        }
    }
}