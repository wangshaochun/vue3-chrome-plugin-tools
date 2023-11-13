//在浏览器当前Tab中创建一个< div >标签并将app.vue文件加载到标签中以完成HTML的植入的操作
//当app.vue成功植入到HTML中时，我们便可以通过chrome自带的功能来获取当前Tab的DOM结构
import { createApp } from 'vue'
import app from './components/app.vue'
joinContent(app)
injectJsInsert()
function joinContent (element) {
	const div = document.createElement('div')
	div.id = 'joinContentApp'
	document.body.appendChild(div)
	//console.log(div)
	createApp(element).mount('#joinContentApp')
}
//chrome的API接口,用于传输或监听数据信号
chrome.extension.onRequest.addListener( 
  function (request) {
    if (request.popAction == "Test") {
		console.log("test")
    }
  }
);
function injectJsInsert () {
	document.addEventListener('readystatechange', () => {
		const injectPath = 'js/inject.js'
		const script = document.createElement('script')
		script.setAttribute('type', 'text/javascript')
		script.src = chrome.extension.getURL(injectPath)
		document.body.appendChild(script)
	})
}
