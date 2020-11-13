const { ipcRenderer } = require("electron");
//Just a help winodw with a pdf for markdown guide
function quithelp() {
    ipcRenderer.send("closehelpwindow","");
}