module.exports = {
    publicPath: "/",
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "productName": "桌面应用", //生成的安装文件名 如：桌面应用.exe
                "win": {
                    //win相关配置
                    "icon": "logo.ico", //图标，当前图标在根目录下
                    "target": [{
                        "target": "nsis", //利用nsis制作安装程序
                        "arch": [
                            "x64", //64位
                            "ia32" //32位
                        ]
                    }]
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "logo.ico",// 安装图标
                    "uninstallerIcon": "logo.ico",//卸载图标
                    "installerHeaderIcon": "logo.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                },
            },
            nodeIntegration: true
        }

    },
}