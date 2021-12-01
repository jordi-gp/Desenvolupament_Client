var worker = new Worker("worker.js");

worker.addEventListener("message", function(e){
    alert(e.data);
});

worker.postMessage("JS > PHP");