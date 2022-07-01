console.log('渲染进程')
const {shell} = require('electron')
const {BrowserWindow} = require("@electron/remote")
const newWindow = document.querySelector('.new-window')
console.log('newWindow',newWindow)
    newWindow.onclick =  ()=>{
        console.log('执行')
        new BrowserWindow({
            width:300,
            height:300
        })
    }

//    点击a跳转
const allA = document.querySelectorAll('a')
allA.forEach(item=>{
    item.onclick = function (){
        shell.openExternal(item.href) //不在渲染进程跳转，而是打开浏览器跳转
    }
})
