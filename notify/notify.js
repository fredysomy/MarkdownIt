const { Notification } = require('electron')
const prath = require("path")
//Below are the code to show notifications
//you can understand what each does by looking the name
module.exports.savenotify=(path)=>{
    const save_notify={
        title:"File Succesfully saved",
        body:`The file was sucessfully saved in the ${path}`,
        closeButtonText: "Ok."
    }
    new Notification(save_notify).show()

}
module.exports.notsaved=()=>{
    const not_save_notify={
        title:"File not saved",
        body:`The file was not saved because no file was specified`,
        closeButtonText: "Ok."
    }
    new Notification(not_save_notify).show()

}
module.exports.pdfsaved=(path)=>{
    const pdf_saved={
        title:"Markdown saved as Pdf succesfully!",
        body:`Pdf is saved in ${path}`,
        closeButtonText: "Ok."
    }
    new Notification(pdf_saved).show()
}
module.exports.htmlsaved=(path)=>{
    const htmlsave={
        title:"Saved",
        body:`Saved the HTML file in ${path}`,
        closeButtonText: "Ok."
    }
    new Notification(htmlsave).show()
}
module.exports.settingssaved=(data)=>{
    const savesttings={
        title:"Settings Saved!!",
        body:data,
        closeButtonText: "Ok."
    }
    new Notification(savesttings).show()
}

module.exports.webpagecreated=(data)=>{
    const webcreated={
        title:"Webpage Created Sucesfully",
        body: `Your site is published at https://markdownitweb.herokuapp.com/${data}`,
        closeButtonText: "Ok."
    }
    new Notification(webcreated).show()
}
module.exports.succesfuldeploy=(data)=>{
    const webpublished={
        title:"Webpage Deployed succesfully",
        body: `Your site is deployed at https://markdownitweb.herokuapp.com/${data} \n With the changes you made`,
        closeButtonText: "Ok."
    }
    new Notification(webpublished).show()
}