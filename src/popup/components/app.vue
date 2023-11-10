<template>
  <div class="wrapper">
<!--3个Tab-->
    <div class="tab">
      <div class="tab-item" @click="tabIndex = 0">Base64</div>
      <div class="tab-item" @click="tabIndex = 1">Unicode</div>
      <div class="tab-item" @click="tabIndex = 2">时间戳转换</div>
      <div class="tab-item" @click="tabIndex = 3">URL编解码</div>
    </div>
<!--3个内容-->
    <div v-show="tabIndex === 0">
      <div class="title">Base64转换</div>
      <div class="content">
        <!--输入内容，转换为Base64-->
        <input type="text" v-model="base64" placeholder="请输入内容" />
        <button @click="base64Encode">编码</button>
        <button @click="base64Decode">解密</button>
        <div class="showtime">{{base64EncodeStr}}</div>
      </div>
    </div>
    <div v-show="tabIndex === 1">
      <div class="title">Unicode</div>
      <div class="content">
        <!--输入内容，转换为Unicode-->
        <input type="text" v-model="unicode" placeholder="请输入内容" />
        <button @click="unicodeEncode">编码</button>
        <button @click="unicodeDecode">解码</button>
        <div class="showtime">{{unicodeEncodeStr}}</div>
      </div>
    </div>
    <div v-show="tabIndex === 2">
      <div class="title">时间戳转换</div>
      <div class="content">
        <!--输入时间戳，转换为时间-->
        <input type="text" v-model="timeStamp" placeholder="请输入时间戳" />
        <button @click="timeStampToTime">转换</button>
        <div class="showtime">{{time}}</div> 
      </div>
    </div>
    <div v-show="tabIndex === 3">
      <div class="title">URL编解码</div>
      <div class="content">
        <!--输入内容，转换为URL编码-->
        <input type="text" v-model="url" placeholder="请输入内容" />
        <button @click="urlEncode">编码</button>
        <button @click="urlDecode">解码</button>
        <div class="showtime">{{urlEncodeStr}}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const timeStamp = ref(0);
const time = ref('test');
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
.showtime {
      margin-top: 10px;
      padding: 5px;
      font-size: 16px;
      border: 1px solid #ccc;
      width: 180px;
    }
button {
      margin-left: 10px;
      padding: 5px;
      font-size: 16px;
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
    }
.title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      margin-top: 10px;
    }
.content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100px;
    }

</style>
