const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    // setTitle: (title) => ipcRenderer.send('set-title', title),
    setToken:(token) => ipcRenderer.send('set-token', token),//设置登录后的cookie信息
    setCookies:(cookies) => ipcRenderer.send('set-cookies', cookies)//设置登录后的cookie信息
})