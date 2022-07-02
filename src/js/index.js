console.log('渲染进程')
const { shell, ipcRenderer } = require('electron')
const fs = require('fs')
const { BrowserWindow, dialog } = require("@electron/remote")
const newWindow = document.querySelector('.new-window')
newWindow.onclick = () => {
    console.log('执行')
    new BrowserWindow({
        width: 300,
        height: 300
    })
}

//    点击a跳转
const allA = document.querySelectorAll('a')
allA.forEach(item => {
    item.onclick = function (e) {
        e.preventDefault()
        shell.openExternal(item.href) //不在渲染进程跳转，而是打开浏览器跳转
    }
})

// 点击打开文件
const content = document.querySelector('textarea')
const openFile = () => {
    const res = dialog.showOpenDialogSync({
        title: '读取文件',
        buttonLabel: '读取',
        filters: [
            { name: 'Custom File Type', extensions: ['js'] }//指定用户可选的文件类型
        ]
    })
    // 用node读取打开的文件
    const fileContent = fs.readFileSync(res[0]).toString() //toString() 用来把二进制文件转化为string
    console.log('fileContent', fileContent);
    content.value = fileContent
}

// 保存文件
const saveFile = () => {
    const res = dialog.showSaveDialogSync({
        title: '保存文件',
        buttonLabel: '保存文件',
        filters: [
            { name: 'index', extensions: ['js'] }//指定用户可选的文件类型
        ]
    })
    console.log(res);
    fs.writeFileSync(res, content.value)
}

// 切换窗口大小
let windowSize = 'unmax-window'
const maxWindow = () => {
    windowSize = windowSize === 'unmax-window' ? 'max-window' : 'unmax-window'
    ipcRenderer.send('max-window', windowSize)//使用ipcRenderer.send，触发主进程的max-window事件,第二个为携带参数
}