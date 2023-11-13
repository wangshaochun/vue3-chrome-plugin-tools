import hotReload from '@/utils/hotReload'
hotReload()
console.log('this is background')
//background作为Chrome插件的后台，随着浏览器的启动而启动，可将全局性的、一直运行的功能放在此处，
//如：监听浏览器的请求、推送消息、定时任务等。