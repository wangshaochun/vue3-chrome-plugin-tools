<template>
  <div class="wrapper"> 
    <div class="tab">
      <div class="tab-item" @click="tabClick(0)">Base64</div>
      <div class="tab-item" @click="tabClick(1)">Unicode</div>
      <div class="tab-item" @click="tabClick(2)">时间戳转换</div>
      <div class="tab-item" @click="tabClick(3)">URL编解码</div>
    </div> 
    <div v-show="tabIndex === 0">
      <div class="content">
        <!--输入内容，转换为Base64-->
        <input type="text" v-model="base64" placeholder="Base64" />
        <div><button @click="base64Encode">编码</button>
        <button @click="base64Decode">解密</button> </div>
        <div class="showContent">{{base64EncodeStr}}</div>
      </div>
    </div>
    <div v-show="tabIndex === 1">
      <div class="content">
        <!--输入内容，转换为Unicode-->
        <input type="text" v-model="unicode" placeholder="Unicode" />
        <div><button @click="unicodeEncode">编码</button>
        <button @click="unicodeDecode">解码</button></div>
        <div class="showContent">{{unicodeEncodeStr}}</div>
      </div>
    </div>
    <div v-show="tabIndex === 2">
      <div class="content">
        <!--输入时间戳，转换为时间-->
        <input type="text" v-model="timeStamp" placeholder=""/>
        <div><button @click="timeStampToTime">转换</button></div>
        <div class="showContent">{{time}}</div> 
      </div>
    </div>
    <div v-show="tabIndex === 3">
      <div class="content">
        <!--输入内容，转换为URL编码-->
        <input type="text" v-model="url" placeholder="URL编码" />
        <div><button @click="urlEncode">编码</button>
        <button @click="urlDecode">解码</button></div>
        <div class="showContent">{{urlEncodeStr}}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const date = new Date();
const timeStamp = ref(date.getTime() / 1000);
const time = ref('');
const base64 = ref('');
const unicode = ref('');
const url = ref('');
const base64EncodeStr = ref('');
const unicodeEncodeStr = ref('');
const urlEncodeStr = ref('');
const tabIndex = ref(0);
const base64Encode = () => {
  base64EncodeStr.value = window.btoa(base64.value)
}
const base64Decode = () => {
  base64EncodeStr.value = window.atob(base64.value)
}
const unicodeEncode = () => {
  unicodeEncodeStr.value = escape(unicode.value).toLocaleLowerCase().replace(/%u/gi, '\\u')
}
const unicodeDecode = () => {
  unicodeEncodeStr.value = unescape(unicode.value.replace(/\\u/gi, '%u'))
}
const urlEncode = () => {
  urlEncodeStr.value = encodeURIComponent(url.value)
}
const urlDecode = () => {
  urlEncodeStr.value = decodeURIComponent(url.value)
}

const timeStampToTime = () => {
  const date = new Date(timeStamp.value * 1000);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  const D = date.getDate() + ' ';
  const h = date.getHours() + ':';
  const m = date.getMinutes() + ':';
  const s = date.getSeconds();
  time.value = Y+M+D+h+m+s
}
// tab切换, 0: base64, 1: unicode, 2: 时间戳转换, 3: URL编解码,选择背景变色
const tabClick = (index) => {
  tabIndex.value = index;
}
</script>
<style scoped>
.wrapper{
  width: 380px;
  height: 200px;
}
input {
      width: 300px;
      padding: 5px;
      font-size: 16px;
    }
.showContent {
      margin-top: 10px;
      padding: 5px;
      font-size: 15px;
      border: 1px solid #ccc;
      width: 300px;
      max-height: 200px;
    }
button {
      margin: 5px;
      padding: 5px;
      font-size: 15px;
      border: 1px solid #ccc;
      cursor: pointer;
    }
.tab {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 30px;
    }
.tab-item {
      cursor: pointer;
      font-weight: bold;

    }
.tab-item:active {
	background-color: rgb(31, 154, 15);
}

.content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; 
    }

</style>
