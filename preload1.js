// onload = () => {
//     const webview = document.querySelector('webview')
//     const indicator = document.querySelector('.indicator')
//     const loadstart = () => {
//         console.log('开始加载')
//         // indicator.innerText = 'loading...'
//     }
//
//     const loadstop = () => {
//         console.log('结束加载')
//     // indicator.innerText = ''
//     }
//     webview.addEventListener('did-start-loading', loadstart)
//     webview.addEventListener('did-stop-loading', loadstop)
// }
// const { session } = require('electron')
// const ses = session.fromPartition("electron")
// ses.cookies.get({url:'https://github.com'}).then(function(cookies,error){
//     console.log(cookies);
// });
// window.addEventListener('DOMContentLoaded', () => {
//     const { session } = require('electron')
//     const ses = session.fromPartition("electron")
//     ses.cookies.get({url:'https://github.com'}).then(function(cookies,error){
//       console.log(cookies);
//     });
// })