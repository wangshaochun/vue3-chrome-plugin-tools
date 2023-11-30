import hotReload from '@/utils/hotReload'
hotReload()
console.log('this is background')
//background作为Chrome插件的后台，随着浏览器的启动而启动，可将全局性的、一直运行的功能放在此处，
//如：监听浏览器的请求、推送消息、定时任务等。

//onBeforeSendHeaders事件会在发送请求之前触发，我们可以在这个事件中获取到请求头中的 Authorization 字段，
//然后将这个字段的值传输给 background.js，这样就完成了从网页中获取 token 的功能。
//这里需要注意的是，我们需要在 manifest.json 中声明 webRequest 和 webRequestBlocking 权限，
//否则 onBeforeSendHeaders 事件不会触发。

//获取某个请求中的 Authorization
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        let token = ''
        for (let i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'Authorization') {
            token = details.requestHeaders[i].value
            break
        }
        }
        console.log(token)
        //将 token 显示到 popup.html 中
        chrome.runtime.sendMessage({ token: token })
    },
    { urls: ['<all_urls>'] },
    ['requestHeaders']
    );

