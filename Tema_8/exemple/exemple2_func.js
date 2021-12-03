window.onload = main;

function main(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        console.log(this.readyState, this.status);

        //comprovació de que tot ha anat correctament
        if(this.readyState==4 && this.status==200){
            //console.log(this.responseText);
            let objeto = JSON.parse(this.responseText);
            console.log(objeto);

            objeto.forEach(element => {
                console.log(element.name);
            });
        }
    }

    xmlhttp.open("GET","http://localhost:3005/people", true);
    xmlhttp.send();
}