<!--
  From the Flowing Data tutorial "Getting Started with D3.js" by Peter Cook
  Source: https://flowingdata.com/2019/06/18/getting-started-with-d3/
-->

<template>
  <div class="chart-wrapper">
    <svg
      width="800"
      height="1000"
    >
      <g class="chart chart--circle">
        <g class="chart__entrants"/>
        <g class="chart__finishers"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'CircleChart'
}
</script>
