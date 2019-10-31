<template>
  <div class="home">
    <label></label>
    <div class="my-chinese-lbl">
      <label>{{curWord}}</label>
    </div>
    
    <div class="my-input-suffix">
      请输入英文：
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-edit"
        clearable
        v-model="input2"
        >
      </el-input>
    </div>
    <div class="my-next-word">
      <el-button type="success">下一个</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curWord: "{这里是中文名称}",
      input: ''
    }
  }
}
</script>

<style>
.home {
  padding: 20px 60px 0 60px;
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