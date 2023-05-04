//------------------------------------demo1(快速入门)-----------------------------------------------
// 需在当前文件内开头引入 Node.js 的 'path' 模块
// const path = require('path')
// const { app, BrowserWindow } = require('electron')
// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })
//
//   win.loadFile('index.html')
// }
// app.whenReady().then(() => {
//   createWindow()
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })
// app.on('window-all-closed', () => {
//   // console.log('dsa')
//   // alert('das')
//   if (process.platform !== 'darwin') app.quit()
// })
//------------------------------------demo1(快速入门)-----------------------------------------------
//------------------------------------demo2(web嵌入)-----------------------------------------------
// 在主进程中.
// const { app, BrowserView, BrowserWindow } = require('electron')
//
// app.whenReady().then(() => {
//   const win = new BrowserWindow({ width: 800, height: 600 })
//   const view = new BrowserView()
//   win.setBrowserView(view)
//   view.setBounds({ x: 0, y: 0, width: 800, height: 600 })
//   view.setAutoResize({width:true,height:true,horizontal:true,vertical:true})
//   view.webContents.openDevTools()
//   view.webContents.loadURL('https://electronjs.org')
//
//   // const win1 = new BrowserWindow({ width: 800, height: 600 })
//   // const view1 = new BrowserView()
//   // win1.setBrowserView(view1)
//   // view1.setBounds({ x: 0, y: 0, width: 800, height: 600 })
//   // view1.setAutoResize({width:true,height:true,horizontal:true,vertical:true})
//   // view1.webContents.openDevTools()
//   // view1.webContents.loadURL('https://electronjs.org')
// })
//------------------------------------demo2(web嵌入)-----------------------------------------------
//------------------------------------demo3(父子窗口)-----------------------------------------------
// const { app,BrowserWindow } = require('electron')
// app.whenReady().then(() => {
//     const top = new BrowserWindow()
//     const child = new BrowserWindow({ parent: top })
//     child.show()
//     top.show()
// })
//------------------------------------demo3(父子窗口)-----------------------------------------------
//------------------------------------demo4(BrowserWindow开启多窗口,cookie隔离)-----------------------------------------------
// const { app, BrowserWindow } = require('electron')
// const createWindow = (partition) => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//           nodeIntegration: true,
//           // preload: path.resolve(__dirname, 'preload.js'),
//           // partition: 'fjhkdlsjflkdsjflktret',
//           partition: partition,
//           contextIsolation: false
//     }
//   })
//   // win.loadFile('index.html')
//   win.webContents.openDevTools()
//   win.loadURL('https://creator.douyin.com',{userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) my-electron-app/1.0.0 Chrome/110.0.5481.192 Electron/23.2.0 Safari/537.36'})
// }
// app.whenReady().then(() => {
//   createWindow('dsdasdsad')
//   createWindow('dlksjdlka')
//   createWindow('jsdlkasjs')
//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })
//------------------------------------demo4(BrowserWindow开启多窗口,cookie隔离)-----------------------------------------------
//------------------------------------demo5(webview开启多窗口,cookie隔离)-----------------------------------------------
require('update-electron-app')()
const path = require('path')
const { app, BrowserWindow, session, ipcMain, net} = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
          preload: path.join(__dirname, 'preload2.js'),
          webviewTag: true,
          // nodeIntegration: true,
          // partition: 'electron'
        }
    })
    win.webContents.openDevTools()
    var ses = session.fromPartition('electron')
    // ses.cookies.set({
    //     url : 'https://www.xiaolu178.com',
    //     name: 'vue_admin_template_token',
    //     value: 'f7426f23-0f1b-4879-99a0-f83d27330255',
    //     domain: 'www.xiaolu178.com',
    //     hostOnly: true,
    //     path: '/',
    //     secure: false,
    //     httpOnly: false,
    //     session: false,
    //     expirationDate: 1682771781,
    //     sameSite: 'unspecified'
    //   },(err)=>{
    //     console.log(err)
    // })
    //目标值
    var partion = 'electron'
    cookieChange(partion,win)
    var partion1 = 'electron1'
    cookieChange(partion1,win)
    // var ses1 = session.fromPartition('electron1')
    // win.loadFile('index1.html')
    const fs = require('fs')
    // const path = require('path')

    // 获取 userData 目录
    const userDataPath = app.getPath('userData')
    const cookiesFilePath = path.join(userDataPath, 'cookies.json')
    console.log(cookiesFilePath)
    // 读取已存在的 cookies 文件
    let cookies = {}
    if(fs.existsSync(cookiesFilePath)) {
      let data = fs.readFileSync(cookiesFilePath)
      cookies = JSON.parse(data)
      console.log(cookies)
    }
    // 写入 cookie 到文件中
    function saveCookies() {
        console.log(JSON.stringify(cookies))
        console.log(JSON.stringify(cookiesFilePath))
      fs.writeFileSync(cookiesFilePath, JSON.stringify(cookies))
    }

    // // 设置 cookie
    // session.defaultSession.cookies.set({
    //   url: 'http://localhost.com',
    //   name: 'key',
    //   value: 'value',
    // }, (error) => {
    //   if (error) console.error(error)
    //   else {
    //     cookies['key'] = 'value'
    //     saveCookies()
    //   }
    // })
    win.loadFile('login.html')
    // win.loadURL()
    // console.log(win.webContents.session.cookies.get({url:""}))
    //todo 监听抖音扫码登录事件
    // ses.cookies.addListener('changed',()=>{
    //     // ses.cookies.get({url:'https://www.xiaolu178.com'}).then(function (cookies,error){
    //     ses.cookies.get({url:'https://creator.douyin.com'}).then(function (cookies,error){
    //         //console.log(cookies)
    //         var sessonid = ses.cookies.get({name:"sessionid"})
    //         var sessonid = ses.cookies.get({url:'https://creator.douyin.com',name:"sessionid"}).then(function (session_value ,error1){
    //             // console.log(typeof(new_cookies))
    //             // console.log(session_value.length)
    //             // console.log(JSON.stringify(sessonid))
    //             // console.log(cookies)
    //             if(session_value.length>0){
    //                 // console.log(cookies)
    //                 //TODO 请求服务端接口保存cookies
    //                 const { net } = require('electron')
    //                 // const request = net.request('https://service.xiaolu178.cn/index.php/saveCookies')
    //                 // request.on('response', (response) => {
    //                 //     console.log(`STATUS: ${response.statusCode}`)
    //                 //     console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    //                 // response.on('data', (chunk) => {
    //                 //     console.log(`BODY: ${chunk}`)
    //                 // })
    //                 // response.on('end', () => {
    //                 //     console.log('No more data in response.')
    //                 // })
    //                 // })
    //                 // request.end()
    //                 let userInfo = {
    //                     cookies: JSON.stringify(cookies),
    //                     pos : partion
    //                     // password: '1234'
    //                 }
    //                 // 1. 新建 net.request 请求
    //                 const request = net.request({
    //                        headers: {
    //                            'Content-Type': 'application/json',
    //                            'token':win.login_token
    //                        },
    //                        method: 'POST',
    //                        url: 'https://service.xiaolu178.cn/index.php/saveCookies'
    //                    })
    //                 // 2. 通过 request.write() 方法，发送的 post 请求数据需要先进行序列化，变成纯文本的形式
    //                 console.log(JSON.stringify(userInfo))
    //                 request.write(JSON.stringify(userInfo))
    //                 // 3. 处理返回结果
    //                 request.on('response', response => {
    //                     response.on('data', res => {
    //                         // res 是 Buffer 数据
    //                         // 通过 toString() 可以转为 String
    //                         // 详见： https://blog.csdn.net/KimBing/article/details/124299412
    //                         // let data = JSON.parse(res.toString())
    //                         console.log(res.toJSON())
    //                     })
    //                     response.on('end', () => {})
    //                 })
    //
    //                 // 4. 记得关闭请求
    //                 request.end()
    //             }
    //             // return session_value
    //         })
    //         // console.log(sessonid)
    //         // console.log(JSON.stringify(sessonid))
    //         // if (typeof(sessonid) !== undefined) {
    //         //     console.log(cookies)
    //         // }
    //     })
    // });
    //todo 监听小鹿登录传递token信息
    ipcMain.on('set-token', (event, token) => {
        // console.log(token)
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.login_token = token;
        console.log(token)
        cookies['vue_admin_template_token'] = token
        saveCookies()
        // 设置 cookie
        session.defaultSession.cookies.set({
          url: 'http://localhost',
          name: 'vue_admin_template_token',
          value: token,
        }, (error) => {
          if (error) console.error(error)
          else {
            cookies['vue_admin_template_token'] = token
            saveCookies()
          }
        })
    })

    ipcMain.on('set-cookies', (event, cookies) => {
        // console.log(token)
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.cookies = cookies;
        //todo 根据cookie找到对应的partion对session进行实例化,同时设置登录态
        // console.log(cookies)
        if(cookies.length>0){
            // console.log(cookies)
            cookies.map(function(item,index,self){
                var ses = session.fromPartition(item.partion)
                // console.log(ses.cookies)
                // console.log(item.cookies)
                item.cookies.map(cookie => cookieReplace(ses.cookies, cookie));
            })
        }
    })
}
app.whenReady().then(() => {
  createWindow()
})
//封装抖音cookie扫码登录成功后的监听事件
function cookieChange(partion,win){
    var ses = session.fromPartition(partion)
    ses.cookies.addListener('changed',()=>{
    // ses.cookies.get({url:'https://www.xiaolu178.com'}).then(function (cookies,error){
    ses.cookies.get({url:'https://creator.douyin.com'}).then(function (cookies,error){
        //console.log(cookies)
        // var sessonid = ses.cookies.get({name:"sessionid"})
        ses.cookies.get({url:'https://creator.douyin.com',name:"sessionid"}).then(function (session_value ,error1){
            if(session_value.length>0){
                //todo 拿到cookies信息还要遍历添加url字段
                for(var i=0;i<cookies.length;i++){
                    cookies[i].url = 'https://creator.douyin.com';
                }
                //TODO 请求服务端接口保存cookies
                const { net } = require('electron')
                let userInfo = {
                    cookies: JSON.stringify(cookies),
                    pos : partion
                }
                // 1. 新建 net.request 请求
                const request = net.request({
                       headers: {
                           'Content-Type': 'application/json',
                           'token':win.login_token
                       },
                       method: 'POST',
                       url: 'https://service.xiaolu178.cn/index.php/saveCookies'
                   })
                // 2. 通过 request.write() 方法，发送的 post 请求数据需要先进行序列化，变成纯文本的形式
                // console.log(JSON.stringify(userInfo))
                request.write(JSON.stringify(userInfo))
                // 3. 处理返回结果
                request.on('response', response => {
                    response.on('data', res => {
                        // console.log(res.toJSON())
                    })
                    response.on('end', () => {})
                })
                // 4. 记得关闭请求
                request.end()
            }
            // return session_value
        })
    })
});
}

// 等待cookie初始化完成
function waitCookieInit(){
	return new Promise(function(resolve){
		setTimeout(resolve, 3000);
	});
}
// 替换cookie
function cookieReplace(cookies,cookie){
	return cookies.remove(cookie.url, cookie.name).then(() => {
		return cookies.set(cookie);
	})
}
//------------------------------------demo5(webview开启多窗口,cookie隔离)-----------------------------------------------
//------------------------------------demo6(获取主窗口session)-----------------------------------------------
// const { BrowserWindow, app } = require('electron')
// app.whenReady().then(() => {
//     const win = new BrowserWindow({ width: 800, height: 600 })
//     win.loadURL('https://github.com')
//     const ses = win.webContents.session.cookies //获取到主窗口的Cookies
//     win.webContents.openDevTools()
//     // console.log(ses.get())
//     //获取Cookies
//     ses.get({ url: 'https://www.baidu.com/' })
//       .then((cookies) => {
//         console.log(cookies)
//       }).catch((error) => {
//         console.log(error)
//       })
// })
// const { session, app } = require('electron')
// app.whenReady().then(() => {
//     //获取页面Cookies
//     session.defaultSession.cookies.get({ url: 'https://www.electronjs.org/' })
//       .then((cookies) => {
//         console.log(cookies)
//       }).catch((error) => {
//         console.log(error)
//       })
// })
//------------------------------------demo6(获取主窗口session)-----------------------------------------------
//------------------------------------demo7(实现原生网络请求)-----------------------------------------------
// const { app } = require('electron')
// app.whenReady().then(() => {
//   const { net } = require('electron')
//   // const request = net.request('https://github.com')
//   const request = net.request('https://www.anyknew.com/api/v1/sites/weibo')
//   request.on('response', (response) => {
//     console.log(`STATUS: ${response.statusCode}`)
//     console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
//     response.on('data', (chunk) => {
//       // console.log(`BODY: ${chunk}`)
//       console.log(`BODY: ${chunk.toJSON()}`)
//       console.log([JSON.parse(chunk.toString())])
//     })
//     response.on('end', () => {
//       console.log('No more data in response.')
//     })
//   })
//   request.end()
// })
//------------------------------------demo7(实现原生网络请求)-----------------------------------------------
//------------------------------------demo8(渲染进程向主进程传递信息)-----------------------------------------------
// const {app, BrowserWindow, ipcMain} = require('electron')
// const path = require('path')
//
// function createWindow () {
//   const mainWindow = new BrowserWindow({
//     webPreferences: {
//       preload: path.join(__dirname, 'preload2.js')
//     }
//   })
//
//   ipcMain.on('set-title', (event, title) => {
//     const webContents = event.sender
//     const win = BrowserWindow.fromWebContents(webContents)
//     win.setTitle(title)
//   })
//
//   ipcMain.on('set-token', (event, token) => {
//     console.log(token)
//   })
//
//
//   mainWindow.webContents.openDevTools()
//   mainWindow.loadFile('index2.html')
// }
//
// app.whenReady().then(() => {
//   createWindow()
//
//   app.on('activate', function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })
//
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })
//------------------------------------demo8(渲染进程向主进程传递信息)-----------------------------------------------
//------------------------------------demo9(创建菜单)-----------------------------------------------
// const { app, Menu, BrowserWindow, shell} = require('electron')
// // const {app, BrowserWindow, ipcMain} = require('electron')
// const path = require('path')
//
// function createWindow () {
//   const mainWindow = new BrowserWindow({
//     webPreferences: {
//       preload: path.join(__dirname, 'preload2.js')
//     }
//   })
//   mainWindow.webContents.openDevTools()
//   const isMac = process.platform === 'darwin'
//
//   const template = [
//     // { role: 'appMenu' }
//     ...(isMac ? [{
//       label: app.name,
//       submenu: [
//         { role: 'about' },
//         { type: 'separator' },
//         { role: 'services' },
//         { type: 'separator' },
//         { role: 'hide' },
//         { role: 'hideOthers' },
//         { role: 'unhide' },
//         { type: 'separator' },
//         { role: 'quit' }
//       ]
//     }] : []),
//     // { role: 'fileMenu' }
//     {
//       label: 'File',
//       submenu: [
//         isMac ? { role: 'close' } : { role: 'quit' }
//       ]
//     },
//     // { role: 'editMenu' }
//     {
//       label: 'Edit',
//       submenu: [
//         { role: 'undo' },
//         { role: 'redo' },
//         { type: 'separator' },
//         { role: 'cut' },
//         { role: 'copy' },
//         { role: 'paste' },
//         ...(isMac ? [
//           { role: 'pasteAndMatchStyle' },
//           { role: 'delete' },
//           { role: 'selectAll' },
//           { type: 'separator' },
//           {
//             label: 'Speech',
//             submenu: [
//               { role: 'startSpeaking' },
//               { role: 'stopSpeaking' }
//             ]
//           }
//         ] : [
//           { role: 'delete' },
//           { type: 'separator' },
//           { role: 'selectAll' }
//         ])
//       ]
//     },
//     // { role: 'viewMenu' }
//     {
//       label: 'View',
//       submenu: [
//         { role: 'reload' },
//         { role: 'forceReload' },
//         { role: 'toggleDevTools' },
//         { type: 'separator' },
//         { role: 'resetZoom' },
//         { role: 'zoomIn' },
//         { role: 'zoomOut' },
//         { type: 'separator' },
//         { role: 'togglefullscreen' }
//       ]
//     },
//     // { role: 'windowMenu' }
//     {
//       label: 'Window',
//       submenu: [
//         { role: 'minimize' },
//         { role: 'zoom' },
//         ...(isMac ? [
//           { type: 'separator' },
//           { role: 'front' },
//           { type: 'separator' },
//           { role: 'window' }
//         ] : [
//           { role: 'close' }
//         ])
//       ]
//     },
//     // {
//     //   role: 'help',
//     //   submenu: [
//     //     {
//     //       label: 'Learn More',
//     //       click: async () => {
//     //         const { shell } = require('electron')
//     //         await shell.openExternal('https://electronjs.org')
//     //       }
//     //     }
//     //   ]
//     // },
//     {
//       label: 'sdjlkasdjlksa',
//       submenu: [
//         {
//           label: '子菜单',
//           click: async () => {
//             const { shell } = require('electron')
//             await shell.openExternal('https://electronjs.org')
//           }
//         }
//       ]
//     }
//   ]
//
//   const menu = Menu.buildFromTemplate(template)
//   Menu.setApplicationMenu(menu)
//   // mainWindow.setMenu(menu)
//   mainWindow.loadFile('index2.html')
// }
//
// app.whenReady().then(() => {
//   createWindow()
// })
//
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })
//------------------------------------demo9(创建菜单)-----------------------------------------------
//------------------------------------demo10(测试electron-store)-----------------------------------------------
// const Store = require('electron-store');
//
// const store = new Store();
//
// store.set('unicorn', '23131');
// console.log(store.get('unicorn'));
// //=> '23131'
//
// // 使用点表示法访问嵌套属性
// store.set('foo.bar', true);
// console.log(store.get('foo'));
// //=> {bar: true}
//
// store.delete('unicorn');
// console.log(store.get('unicorn'));
// //=> undefined
//------------------------------------demo10(测试electron-store)-----------------------------------------------
