const {ipcRenderer}=require('electron');
const {webpagecreated}=require('../notify/notify')
const { Notification } = require('electron')

function createsite() {
    if(navigator.onLine) {
        ipcRenderer.send("opencreatesite","");
    }
    else{
        window.alert("No network connection found")
    }
}
function quitcreatesite() {
    ipcRenderer.send("quitcreatewindow","");
}
function createsitenow() {
    if(navigator.onLine) {
        title=document.getElementById('title').value;
        desc=document.getElementById('desc').value;
        webname=document.getElementById('namesite').value;
        fetch('https://markdownitweb.herokuapp.com/api/markdownit/make',{method:'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({name:webname,desc:desc,title:title})}).then(datta=>datta.json()).then(dataaa=>{
        ipcRenderer.send("saveconfignow",dataaa);
        window.alert(`Your website is published at https://markdownitweb.herokuapp.com/${dataaa.name}`);
        document.getElementById("webname").innerHTML=`https://markdownitweb.herokuapp.com/${dataaa.name}`;
        });
    }
    else {
        window.alert("No network connection found ,Unable to Create the Site")
    }
}

function publishsite(){
    if(navigator.onLine) {
        data_config=ipcRenderer.sendSync("getconfigfiles","Publish");
        clean_data=JSON.parse(data_config);
        blogdata=editor.getSession().getValue();
        fetch('https://markdownitweb.herokuapp.com/api/markdownit/update',{method:'POST',
        headers: {
        'Content-Type': 'application/json',
         },
          body:JSON.stringify({name:clean_data.name,id:clean_data.id,blog:blogdata})}).then(response=>response.json()).then(res=>{
        ipcRenderer.send("publishedsuccesfully",clean_data.name)
        
        });
    }
    else {
        window.alert("No network connection found ,Unable to publish the Site")
    }
    
}
function editcreatedsite() {
    if(navigator.onLine) {
        data_config_for_edit=ipcRenderer.sendSync("getconfigfiles","Edit");
        clean_data_edit=JSON.parse(data_config_for_edit);
        fetch('https://markdownitweb.herokuapp.com/api/markdownit/get',{method:'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({name:clean_data_edit.name,id:clean_data_edit.id})}).then(response=>response.json()).then(res=>{
        editor.setValue(res);
        });
    }
    else {
        window.alert("No network connection found ,Unable to Edit site.")
    }
}