const fs_s=require("fs")
const pt=require("path")
const {ipcRenderer}=require('electron')
//reading the settings.json which contains the editor themes
window.onload=()=>{
data=fs_s.readFileSync(pt.join(__dirname,'../settings/settings.json'),"utf-8")
y=JSON.parse(data)
document.getElementById('bg').value=y.bgcolor;
document.getElementById('txt').value=y.txt_color;
document.getElementById("select1").value=y.code_editor_theme;}
//quit the settings window
function quitsettings() {
    ipcRenderer.send("close_settings","");
}
//save the settings
function savesettings() {
    y.bgcolor=document.getElementById('bg').value;
    y.txt_color=document.getElementById('txt').value;
    y.code_editor_theme=document.getElementById("select1").value;
    fs_s.writeFileSync(pt.join(__dirname,'../settings/settings.json'),JSON.stringify(y))
    ipcRenderer.send("settingssaved","Settings saved , please Apply changes to display changes")
    
}
//used to save adn reload the window(writes the new settings into settings.json file)
function exitandreload() {
    ipcRenderer.send("quit-screen","Quitscreenandreaload")
}