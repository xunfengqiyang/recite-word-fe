<script>
import books from './components/books'
import home from './components/home';

export default {
  components: { books, home },
  data: function() {
    return {}
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
