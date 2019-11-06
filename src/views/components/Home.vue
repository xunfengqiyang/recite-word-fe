<template>
  <div class="home">
    <label></label>
    <div class="my-chinese-lbl">
      <label>{{curWord}}</label>
    </div>

    <md-field>
      <label>请输入内容</label>
      <md-input v-model="type"></md-input>
      <span class="md-helper-text">英文单词</span>
    </md-field>

    <div class="my-next-word">
      <md-button class="md-primary">下一个</md-button>
    </div>
  </div>
</template>

<script>
import Bus from './bus.js';
export default {
  data() {
    return {
      curWord: "{这里是中文名称}",
      input: ''
    }
  },
  mounted() {
    var vm = this;
    Bus.$on("handleUseBook", (data) => {
      console.log("Home receive data:" + data);
      
    })
  }
}

</script>

<style>
.home {
  padding-top: 20px;
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.my-chinese-lbl {
  margin-top: 80px;
}

.my-input-suffix {
  width: 400px;
  margin-top: 120px;
  margin-left: auto;
  margin-right: auto;
}

.my-next-word {
  margin-top: 60px;
}
</style>
