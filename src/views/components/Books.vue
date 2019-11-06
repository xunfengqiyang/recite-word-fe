<script src="js/vue-resource.js"></script>
<template>
  <div class="books">

    <h3>{{title}}</h3>
    <md-button class="md-primary md-sm" @click="drawer = true">切换单词本</md-button>

    <el-drawer 
      title="单词本"
      custom-class="books-drawer"
      :visible.sync="drawer"
      :direction="direction"
      size="540px">

      <div class="drawer-container">
        <el-table :data="gridData">
          <el-table-column property="display_name" label="文件" width="200"></el-table-column>
          <el-table-column property="create_dt" label="日期" width="150"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <md-button class="md-success md-sm"
              @click="handleUse(scope.$index, scope.row)"
              >使用</md-button>
              <md-button class="md-danger md-sm"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</md-button>
            </template>
          </el-table-column>
        </el-table>
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
import Bus from './bus.js';
export default {

  data: function() {
    return {
      title: "请先选择单词本",
      drawer: false,
      direction: 'ltr',
      gridData: [],
    };
  },
  ready: function () {
    this.getList();
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList: function() {
      let that = this;
      this.$http.get('/book').then((response) => {
        let body = response.body;
        if (body.success == true) {
          that.gridData = body.result;
        }
      }, (response) => {
        console.error(response);
      });
    },
    handleUse: function (index, row) {
      let bookId = row.id;
      this.getBook(bookId);
      this.drawer = false;
      Bus.$emit('handleUseBook', bookId);
    },
    handleDelete: function (index, row) {
      let that = this;
      let path = "/book/" + row.id;
      this.$http.delete(path).then((response) => {
        that.getList();
      }, (error) => {
        console.error(error);
      })
    },
    getBook: function (bookId) {
      let that = this;
      let path = "/book/" + bookId;
      this.$http.get(path).then((response) => {
        let body = response.body;
        if (body.success == true) {
          that.title = body.result.display_name;
        }
      }, (response) => {
        console.error(response);
      });
    },
    uploadSuccess: function(response, file, fileList) {
      console.log("upload success");
      console.log(file);
      let that = this;
      that.getList();
    },
    uploadFail: function() {
      console.log("upload fail");
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {}
        );
    },
    handleEdit(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style>
.drawer-container {
  padding: 20px 30px 0 30px;
}
</style>
