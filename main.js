const { app, BrowserWindow, Menu, globalShortcut, ipcRenderer } = require('electron')
const { ipcMain } = require('electron/main')

// 监听初始化动作
app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    frame: false,  //隐藏窗口顶部菜单
    webPreferences: {
      nodeIntegration: true,//允许渲染进程使用nodejs
      contextIsolation: false, //允许渲染进程使用nodejs
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

  // 在主进程里面注册快捷键
  globalShortcut.register('CommandOrControl+x', () => {
    console.log('按下了control + x');
  })

  // 注册快捷键 放大窗口
  globalShortcut.register('CommandOrControl+m', () => {
    console.log('按下了control + m');
    mainWindow.maximize()
  })
  // 缩小窗口
  globalShortcut.register('CommandOrControl+t', () => {
    console.log('按下了control + t');
    mainWindow.unmaximize()
  })
  // 关闭窗口
  globalShortcut.register('CommandOrControl+h', () => {
    console.log('按下了control + h');
    mainWindow.close()
  })

  // 定义自定义事件
  ipcMain.on('max-window', (event, arg) => {
    console.log('arg', arg);
    if (arg === 'max-window') return mainWindow.maximize()
    mainWindow.unmaximize()
  })

})