<template>
  <div class="home">
    <label></label>
    <div class="my-chinese-lbl">
      <label>{{curChinese}}</label>
    </div>

    <md-field>
      <label>请输入内容</label>
      <md-input 
      v-model="word_input" 
      @keyup.enter="onInputChange" 
      @input="onInputChange($event)"
      clearable
      ></md-input>
      <span class="md-helper-text">英文单词</span>
    </md-field>

    <div class="my-next-word">
      <md-button class="md-primary" @click="onClickNext()">下一个</md-button>
    </div>
    <modal v-if="classicModal" @close="classicModal = false">
      <template slot="header">
        <h4 class="modal-title">评测结果</h4>
        <md-button class="md-simple md-just-icon md-round modal-default-button" @click="classicModal = false">
          <md-icon>clear</md-icon>
        </md-button>
      </template>

      <template slot="body">
        <p>{{resultContent}}</p>
      </template>

      <template slot="footer">
        <md-button class="md-danger md-simple" @click="classicModal = false">Close</md-button>
      </template>
    </modal>
  </div>
</template>

<script>
import Bus from './bus.js';
import {Modal} from '@/components';
export default {
  components: { Modal },
  data() {
    return {
      curWordList: [],
      curWord: "",
      curChinese: "{这里是中文名称}",
      curIndex: 0,
      word_input: '',
      answer: [],
      classicModal: false,
      resultContent: ""
    }
  },
  mounted() {
    var vm = this;
    Bus.$on("handleUseBook", (data) => {
      this.getBookWord(data);
    })
  },
  methods: {
    onClickNext() {
      console.log("click next");
       this.answer.push(this.word_input);
      if (this.curIndex + 1 >= this.curWordList.length) {
        this.calculateResult();
        this.classicModal = true;
      }
      else  {
        this.curIndex = this.curIndex + 1;
        this.curWord = this.curWordList[this.curIndex];
        this.getTranslation();
        this.word_input = "";
      }
    },
    getBookWord(bookId) {
      let that = this;
      let path = "/book/words/" + bookId;
      this.$http.get(path).then((response) => {
        let body = response.body;
        if (body.success == true) {
          that.curIndex = 0;
          that.curWordList = body.result;
          that.curWord = that.curWordList[that.curIndex];
          that.answer = [];
          that.getTranslation();
        }
      }, (error) => {
        console.error(error);
      })
    },
    getTranslation() {
      let that = this;
      let path = `/search?word=${this.curWord}`;
      this.$http.get(path).then((response) => {
        let body = response.body;
        if (body.success == true) {
          let tip = `${body.result}（${that.curIndex+1}/${that.curWordList.length}）`;
          that.curChinese = tip;
        }
      })
    },
    onInputChange(value) {
    },
    calculateResult() {
      let count = 0;
      for (let i = 0; i < this.curWordList.length; i++) {
        const word = this.curWordList[i];
        const a = this.answer[i];
        if (word && a) {
          if (word.trim() == a.trim()) {
            count++;
          }
        }
      }
      let score = count.toFixed(2) / this.curWordList.length.toFixed(2) * 100;
      let content = `恭喜你答对了${count}道题，您的得分为：${score.toFixed(2)}`;
      this.resultContent = content;
    }
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
