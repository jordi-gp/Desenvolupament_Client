window.onload = main;

function main(){

}

const DNI = new RegExp("\d\d\d\d\d\d\d\d\d[A-Z]{1,1}$");
const numTel = new RegExp("\d\d\d\s\d\d\d\s\d\d\d");
const data = new RegExp();
const matrCotxe = new RegExp("\d\d\d\d\s[A-Z]");
const email = new RegExp("[\S]{5,25}$");
const URL = new RegExp('^(ftp|http|https):\/\/[^ "]+$');