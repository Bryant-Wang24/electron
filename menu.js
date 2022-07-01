const { BrowserWindow,Menu } = require('electron')
//创建一个菜单模板
const template = [
    {
        label:'文件',
        submenu:[
            {
                label:'新建菜单',
                click(){
                    new BrowserWindow({
                        width:400,
                        height:500
                    })
                }
            }
        ]
    },
    {
        label: '关于我们'
    }
]

//编译模板
const menu = Menu.buildFromTemplate(template)
//设置菜单
Menu.setApplicationMenu(menu)