function myFunction() {
    var x = document.getElementById("w3review").value;
    var md = window.markdownit();
    var result = md.render(x);
    document.getElementById("demo").innerHTML =result;
}