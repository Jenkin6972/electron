// const ses = session.fromPartition("electron")
// ses.cookies.get({url:'https://www.baidu.com/'}).then(function(cookies,error){
//       console.log(213123)
//       console.log(cookies)
// })
// const {session} = require('electron')
// window.onload = function() {
//     console.log(session)
//     var webview = document.getElementById("foo");
//     // var indicator = document.querySelector(".indicator");
//     var loadstart = function() {
//         console.log('开始')
//       // indicator.innerText = "loading...";
//     }
//     var loadstop = function() {
//         console.log('结束')
//     }
//     webview.addEventListener("did-start-loading", loadstart);
//     webview.addEventListener("did-stop-loading", loadstop);
//   }
// var webview = document.getElementById("foo")
// webview.openDevTools()
// webview.addEventListener("did-start-loading",()=>{
//     console.log('开始')
// })
// webview.addEventListener("did-stop-loading",()=>{
//     console.log([webview])
//     console.log('结束')
// })
// webview.addEventListener("dom-ready",()=>{
//     webview.openDevTools()
// })
onload = function() {
 var webview1 = document.getElementById("foo");
 webview1.addEventListener("dom-ready", function(){
   // console.log('打开开发者工具')
   webview1.openDevTools() // 这里！ 打开 webview的控制台
   webview1.executeJavaScript(`alert('document.title')`)
    // console.log(webview1.getElementsByClassName('login'))
    // const waitForExternal = setInterval(() => {
    //   if (document.querySelector('.login')){
    //     clearInterval(waitForExternal);
    //     console.log('登录按钮');
    //   }else{
    //     console.log('no');
    //   }
    // }, 1000);
    webview1.executeJavaScript("const waitForExternal = setInterval(() => {if (document.querySelector('.login')){clearInterval(waitForExternal);console.log('登录按钮');document.querySelector('.login').click()}else{console.log('no');}}, 200);") });
    // webview1.executeJavaScript("if (document.querySelector('.login')) {console.log('登录按钮');document.querySelector('.login').click()}") });
}
// const waitForExternal = setInterval(() => {
//     if (document.querySelector('.login'))
//     {
//         clearInterval(waitForExternal);
//         console.log('登录按钮');
//         document.querySelector('.login').click()
//     }
//     else{console.log('no');}}, 1000);
// if (document.querySelector('.login')) {console.log('登录按钮');document.querySelector('.login').click()}