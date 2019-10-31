<template>
  <div class="books">

    <h3>单词本1</h3>
    <el-button type="text" @click="drawer = true">切换单词本</el-button> 

    <el-drawer 
      title="单词本"
      custom-class="books-drawer"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="500px">

      <div class="drawer-container">
        <el-table :data="gridData">
          <el-table-column property="name" label="文件" width="200"></el-table-column>
          <el-table-column property="date" label="日期" width="150"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">使用</el-button>
            </template>
          </el-table-column>
        </el-table>
      
        <!-- <el-button @click="startHacking">Start</el-button> -->
        <div style="height: 100px"></div>
        <span>上传新的单词本</span>
        <el-upload
          class="upload-demo"
          drag
          action="/api/book"
          @on-success="uploadSuccess"
          @on-error="uploadFail"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </el-drawer>


  </div>
</template>

<script>
export default {

  data: function() {
    return {
      drawer: false,
      direction: 'ltr',
      gridData: [{
        date: '2016-05-02',
        name: '单词本1',
      }, {
        date: '2016-05-04',
        name: '单词本2',
      }, {
        date: '2016-05-01',
        name: '单词本3',
      }, {
        date: '2016-05-03',
        name: '单词本4',
      }],
    }
  },
  
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
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {}
        );},
    handleEdit(index, row) {
      console.log(index, row);
    },
  }
}
</script>

<style>

.drawer-container {
  padding: 20px 30px 0 30px;
}
</style>