// Scripts for rendering Markdown as html,pdf and for Manipulating Settings.json


const df=require('fs')
const pt=require('path')
x=df.readFileSync(pt.join(__dirname,"../settings/settings.json"),"utf-8")
data=JSON.parse(x);
//the below functions live render the md as html
function update() {
    var x = editor.getSession().getValue();
    var md = window.markdownit({
        html: true,
        linkify: true,
        typographer: true,
      });
    var result = md.render(x);
    document.getElementById("demo").innerHTML =result;
}
//Minimize the window
function mini() {
     ipcRenderer.send("minimize","")
     
}
//opens any .md files in the editor
function openfile() {

    x=ipcRenderer.sendSync("open1","")
    editor.setValue(x)
   
   
}
//MAximize the window
function max() {
    ipcRenderer.send("maximize","")
}
//Quit the current window
function quit() {
    ipcRenderer.send("quit","")
}
//Save a file
function saveas() {
    var x = editor.getSession().getValue();
    ipcRenderer.send("open",x);
}
//opens a external link in browser
function openlink(path){
    require('electron').shell.openExternal(path)
}
//main.html line 60. Open the settings
function openwindow(){
    ipcRenderer.send("openwindow","yes do it");
}
//Save md as pdf
function savepdf() {
    var xy = editor.getSession().getValue();
    ipcRenderer.send("savetopdfnow",xy);
}
//save md as html
function savehtml() {
    var x2 = editor.getSession().getValue();
    var md2 = window.markdownit({
        html: true,
        linkify: true,
        typographer: true,
      });
    var result2 = md2.render(x2);
    ipcRenderer.send("savehtmlnow",result2);
}
//open a new winodw for help
function givehelp() {
    ipcRenderer.send("helpmewithmarkdown","");
}

//PREVENT THE DEFAULT OPENING OF LINKS IN THE MAIN PROCESS.

window.onload=()=>{
document.getElementById("wer").addEventListener('click',(e)=>{e.preventDefault()});
}
