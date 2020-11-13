const electron = require('electron');
const url=require('url');
const path=require('path');
const fs=require('fs');
const { Notification } = require('electron')
//Custom notifications created 
const { savenotify,
    notsaved,
    pdfsaved,
    settingssaved,
    htmlsaved,
    webpagecreated,
    succesfuldeploy }=require('./notify/notify')
const {app,BrowserWindow,Menu,ipcMain,dialog,remote,webContents} =electron;
var markdownpdf = require("markdown-pdf")
let mainwindow;
let setingwindow;
let sitewindow;
app.on('ready',()=>{
    mainwindow=new BrowserWindow({
        width: 1300,
        height: 855,
        backgroundColor: '#2e2c29',
        webPreferences: {
            nodeIntegration:true
        },
        frame:false,
   
    });
    mainwindow.loadURL(url.format({
        pathname:path.join(__dirname,'public/main.html'),
        protocol:'file:',
        slashes:true
    }));
    mainwindow.webContents.on("new-window", function(event, url) {
        event.preventDefault();
        shell.openExternal(url);
      });
    

});

ipcMain.on("open",(event,arg)=> {
    dialog.showSaveDialog({filters:[{name: "Markdown",extensions:['md']}]})
    .then(data => data.filePath)
    .then(path =>{
        if (path== undefined) {
            console.log("Cannot be saved")
            notsaved()
        }
        else{
            fs.writeFileSync(path,arg);
            savenotify(path)
        }
   
        
    }).catch((err)=> {
       console.log(err)
    })

});
ipcMain.on("open1",(event,arg)=> {
    dialog.showOpenDialog(mainwindow,{filters:[{name: "Markdown",extensions:['md']}]})
    .then(data1 => data1.filePaths)
    .then(path2 =>{
        x=path2[0]
        
        if (x == undefined) {
            return;
        }
        else {
            try{
            data=fs.readFileSync(x,'utf-8')
            event.returnValue = data;
            }
            catch(err) {
                console.log(err)
            }
            
        }
      
        
    }).catch((err)=> {
        console.log(err)
    })

});


ipcMain.on("minimize",(even,msg)=>{
    mainwindow.minimize()
});
ipcMain.on("maximize",(even,msg)=>{
    mainwindow.maximize()
});
ipcMain.on("quit",(even,msg)=>{
   app.quit()
});
ipcMain.on('openwindow',(ev,ar)=>{
   setingwindow=new BrowserWindow({
    width: 550,
    height: 700,
    backgroundColor: '#2e2c29',
    webPreferences: {
        nodeIntegration:true
    },
    frame:false,
   });
   setingwindow.loadURL(url.format({
    pathname:path.join(__dirname,'public/settings.html'),
    protocol:'file:',
    slashes:true
}));
});
ipcMain.on('close_settings',(e,a)=>{
    setingwindow.close()
});
ipcMain.on('quit-screen',(e,a)=>{
    setingwindow.close();
    mainwindow.reload()
});

ipcMain.on("savetopdfnow",(event1,arg)=>{
    dialog.showSaveDialog({filters:[{name: "Pdf",extensions:['pdf']}]})
    .then(fil => fil.filePath)
    .then(ppath=>{
        if (ppath == undefined) {
            return;
        }
        else{
        markdownpdf({
            remarkable: {
                html: true,
                breaks: true
            }
        }).from.string(arg).to(ppath, function () {
            pdfsaved(ppath);
        })
    }
    })
})
ipcMain.on("savehtmlnow",(event1,arg)=> {
    dialog.showSaveDialog({filters:[{name: "HTML",extensions:['html','htm']}]})
    .then(data => data.filePath)
    .then(path =>{
        if (path== undefined) {
            console.log("Cannot be saved")
            notsaved()
        }
        else{
            fs.writeFileSync(path,arg);
            htmlsaved(path);
        }
   
        
    }).catch((err)=> {
       console.log(err)
    })

});
ipcMain.on('settingssaved',(ev,args)=>{
    settingssaved(args);
})

ipcMain.on("helpmewithmarkdown",(even,arg)=>{
    helpwindow=new BrowserWindow({
        width: 550,
        height: 700,
        backgroundColor: '#2e2c29',
        webPreferences: {
            nodeIntegration:true
        },
        frame:false,
       });
       helpwindow.loadURL(url.format({
        pathname:path.join(__dirname,'public/help.html'),
        protocol:'file:',
        slashes:true
    }));
    
})

ipcMain.on("closehelpwindow",(ev,arg)=>{
    helpwindow.close();
})
ipcMain.on("opencreatesite",(ev,arg)=>{
        sitewindow=new BrowserWindow({
        width: 550,
        height: 700,
        backgroundColor: '#2e2c29',
        webPreferences: {
            nodeIntegration:true
        },
        frame:false,
       });
       sitewindow.loadURL(url.format({
        pathname:path.join(__dirname,'public/site.html'),
        protocol:'file:',
        slashes:true
    }));
    
})
ipcMain.on("quitcreatewindow",(e,a)=>{
    sitewindow.close();
})

ipcMain.on("saveconfignow",(eve,arg)=>{
    dialog.showSaveDialog({title:"Save and Remember the path to the config file", buttonLabel:"Save Config file",defaultPath:`${arg.name}.json`,filters: [{ name: 'Data File', extensions: ['json'] }],})
    .then(data => data.filePath)
    .then(path =>{
        if (path== undefined) {
            notsaved()
            return;
            
        }
        else{
        
            
            fs.writeFileSync(path,JSON.stringify({name:arg.name,id:arg.id}));
            webpagecreated(arg.name);
        }
   
        
    }).catch((err)=> {
       console.log(err)
    })
})
ipcMain.on('getconfigfiles',(ev,arg)=>{
    dialog.showOpenDialog(mainwindow,{title:"Select config file of your website", buttonLabel:`Select and ${arg}`,filters:[{name: "JSON",extensions:['json']}]})
    .then(data1 => data1.filePaths)
    .then(path2 =>{
        x=path2[0]
        if (x == undefined) {
            return;
        }
        else {
            try {
            data=fs.readFileSync(x,'utf-8')
            ev.returnValue = data;
            }
            catch(err) {
                console.log("error")
            }
            
        }
      
        
    }).catch((err)=> {
        console.log(err)
    })

})
ipcMain.on('publishedsuccesfully',(ev,arg)=>{
    succesfuldeploy(arg)
})