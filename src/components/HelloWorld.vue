<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <CircleChart/>
  </div>
</template>

<script>
import * as types from '@/store/types'
import CircleChart from '@/components/CircleChart'

export default {
  name: 'HelloWorld',
  components: {
    CircleChart
  },
  props: {
    msg: String
  },
  created () {
    return this.$store.dispatch(types.FETCH_CHART_DATA)
  }
}
</script>

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
