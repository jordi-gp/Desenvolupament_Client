let arrPoke = new Array;
window.onload = main;

var paginacio = 10;
var pagInici = 0;
var pagFin = 10;

function main(){
  // cridar al api 
  fetch('https://pokeapi.co/api/v2/pokemon?limit=1100&offset=0')
  .then(response => response.json())
  .then(data =>{
      arrPoke = data.results;
      cargarLista();
      console.log(arrPoke);
  });

  document.addEventListener("scroll", carregaElements);
}

function cargarLista (){
  
  //recorrer Array

  /**************************************************************************
  * En cas de ser major el nombre de paginació al dels elements de l'array  *
  * s'utilitza per al bucle 'for' el '.length' del array per tal de mostrar *
  * els elements justs que falten i no fer una càrrega excesiva que         *
  * realmente no es necessària                                              *
  ***************************************************************************/

  if(paginacio > arrPoke.length){
    for(let i=pagInici;i < arrPoke.length  ; i++){
      cargarPagina(arrPoke[i],i);
    };
  }
  
  for(let i=pagInici;i<paginacio  ; i++){
    cargarPagina(arrPoke[i],i);
  };

  pagInici = paginacio;
  paginacio += pagFin;
   
  //console.log(pagInici);
  //console.log(paginacio);
  //console.log(pagFin);
}

function cargarPagina (element, ind){

    fetch(element.url)
     .then(response => response.json())
     .then(data =>{
        //console.log(data);
        // Afegir dades
        document.getElementById("listado").innerHTML += '<div class="card mb-4">' +
          '<a href="#!"><img class="card-img-top" src="'+  data.sprites.front_default + '" alt="..." /></a>' +
          '<div class="card-body">' +
              '<h2 class="card-title">' + data.name +'</h2>' +
              '<div class="row">'+
                  '<div class="col p-3 text-center"><strong>Peso: ' + data.weight + ' </strong></div>'+  
                  '<div class="col p-3 text-center"><strong>Altura: ' +  data.height + ' </strong></div>'+      
              '</div>'+
          '</div>' +
      '</div>';
      });
};

function carregaElements(){
  var pos = window.scrollY;
  var ampleTot = document.body.scrollHeight - window.innerHeight;
  
  if(pos == ampleTot){
    cargarLista();
  }
}
