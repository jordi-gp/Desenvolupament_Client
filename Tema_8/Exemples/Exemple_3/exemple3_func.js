window.onload = main;

function main(){
    callApi();
}

function callApi(){
    //url to call
    var url = ("https://api.covid19tracking.narrativa.com/api/2020-12-13/country/spain");

    //getting the information from the 'json' file
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data));
}