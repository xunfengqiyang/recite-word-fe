<script>
import books from './components/Books'
import home from './components/Home';

export default {
  components: { books, home },
  data: function() {
    return {
      bookId: ""
    }
  },
  methods: {
    handleUseBook: function (childValue) {
      console.log("get child value:" + childValue);
      this.bookId = childValue;
    }
  }
}

</script>

<template>
  <div id="app">
    <div>
      <div>
        <books></books>
        <home></home>
      </div>

    </div>
  </div>
</template>


<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
