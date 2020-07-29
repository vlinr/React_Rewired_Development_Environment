//不进行桌面开发就无需处理此处

const electron = require('electron')  //引入electron模块

const app = electron.app   // 创建electron引用
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;  //创建窗口引用

let mainWindow = null ;  //声明要打开的主窗口
app.on('ready',()=>{
    mainWindow = new BrowserWindow({width:400,height:400})   //设置打开的窗口大小
    mainWindow.loadURL('http://localhost:3000')  //加载那个页面
    // mainWindow.webContents.openDevTools({mode:'right'});
    //监听关闭事件，把主窗口设置为null
    mainWindow.on('closed',()=>{
        mainWindow = null
    })
    let webContents = mainWindow.webContents;
    //ctrl+f12打开控制台
    globalShortcut.register('CommandOrControl+F12',()=>{
        webContents.isDevToolsOpened()?webContents.closeDevTools():mainWindow.webContents.openDevTools({mode:'right'});
    })
})


//使用yarn add electron 或者 yarn global add electron进行安装electron，使用electron .启动桌面版本的程序，自动热更新