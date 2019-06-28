<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
// import * as d3 from 'd3'
import * as types from '@/store/types'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created () {
    return this.$store.dispatch(types.FETCH_DATA)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
