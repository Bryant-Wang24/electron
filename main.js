const { app, BrowserWindow,Menu } = require('electron')

// 监听初始化动作
app.on('ready',()=>{
  const mainWindow = new BrowserWindow({
    width:600,
    height:800,
    frame:false,  //隐藏窗口顶部菜单
    webPreferences:{
      nodeIntegration:true,//允许渲染进程使用nodejs
      contextIsolation:false, //允许渲染进程使用nodejs
      //开启渲染进程使用node
      // nodeIntegration:true,
      //开启remote模块
      // enablePreferredSizeMode:true,  //已弃用
    }
  })

  //使用remote模块
  const remote = require("@electron/remote/main")
  remote.initialize()
  remote.enable(mainWindow.webContents)

  // 加载渲染进程文件
  mainWindow.loadFile('./src/index.html')

  // const mainWindow2 = new BrowserWindow({
  //   width:600,
  //   height:800
  // })
  // mainWindow2.loadFile('./src/index2.html')

  //打开控制台
  mainWindow.webContents.openDevTools()

  require('./menu.js')
})