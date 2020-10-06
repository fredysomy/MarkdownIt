const electron = require('electron');
const url=require('url');
const path=require('path');

const {app,BrowserWindow,Menu} =electron;
let mywindow;
let mainwindow;

app.on('ready',()=>{
    mainwindow=new BrowserWindow({
        width: 1300,
        height: 800,
        backgroundColor: '#2e2c29',
        title:"Markdown Editor" 
    });
    mainwindow.loadURL(url.format({
        pathname:path.join(__dirname,'main.html'),
        protocol:'file:',
        slashes:true
    }));
    const mainmenu=Menu.buildFromTemplate(mennu);
    Menu.setApplicationMenu(mainmenu)

});
function createwindow() {
    mywindow=new BrowserWindow({
        width:400,height:300,title:'Signin Window'
    });
    mywindow.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol:'file:',
        slashes:true
    }));


}
const mennu=[
    {
        label:"Menu",
        submenu:[
            {
                label:"Signin",click(){createwindow()}
            },
        ,
            {
                label:"Quit",accelerator:process.platform== 'darwin' ? 'Command+Q': 'Ctrl+Q',click(){
                    app.quit()
                }
            }
        ]

    },
    {
        label:"ANotherMenu",
        submenu:[
            {
                label:"wow"
            }
        ]
    }
]
