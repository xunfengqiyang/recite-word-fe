<template>
  <div class="books">
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <span>我来啦!</span>
    </el-drawer>

    <!-- <el-button @click="startHacking">Start</el-button> -->
    <el-upload
      class="upload-demo"
      drag
      action="/api/book"
      @on-success="uploadSuccess"
      @on-error="uploadFail"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  
  ready: function () {
    this.getList();
  },
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    },
    getList: function() {
      let that = this;
      this.$http.get('/book').then((response) => {
        console.info(response.body)
      }, (response) => {
        console.error(response)
      });
    },
    uploadSuccess: function(response, file, fileList) {
      console.log("upload success");
      console.log(file);
    },
    uploadFail: function() {
      console.log("upload fail");
    }
  }
}
</script>

<style>

</style>