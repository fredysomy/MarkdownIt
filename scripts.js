function myFunction() {
    
    var x = document.getElementById("w3review").value;
    var md = window.markdownit();
    var result = md.render(x);
    document.getElementById("demo").innerHTML =result;
}

function copyToclip() {
    var x = document.getElementById("w3review");

    x.select()
    x.setSelectionRange(0, 100000);
    document.execCommand("copy");

   
    alert("The README is Copied to Clipboard");
}