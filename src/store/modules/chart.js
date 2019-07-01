import * as types from '@/store/types'
import client from 'api-client'
import * as d3 from 'd3'

const state = {
  chartData: [],
  chartIsLoading: false,
  chartError: null
}

const getters = {
  getChartData: state => state.chartData
}

const mutations = {
  [types.SET_CHART_LOADING_STATUS]: state => (state.chartIsLoading = !state.chartIsLoading),
  [types.SET_CHART_ERROR]: state => state.chartError,
  [types.SET_CHART_DATA]: (state, payload) => (state.chartData = payload),

  /*
   * From the Flowing Data tutorial "Getting Started with D3.js" by Peter Cook
   * Source: https://flowingdata.com/2019/06/18/getting-started-with-d3/
   */
  [types.UPDATE_CHART_DATA]: state => {
    // Use D3 scale function to scale circle area according to number of entrants
    const maxRadius = 20
    const rScale = d3.scaleSqrt().domain([0, 210]).range([0, maxRadius])

    // Arrange the circles in a grid
    const layout = (data) => {
      const cellSize = 80

      // Each row will contain 10 circles, representing a decade
      const numCols = 10

      // Iterates through data and adds layout object containing coordinate and radius of each tour
      data.forEach(d => {
        d.layout = {}

        // Calculate index based on year
        const i = d.Year - 1900

        // Coordinates layout.x and layout.y are calculated by multiplying col and row by cellSize
        // As i increments, col will be remainder after dividing i by numCols
        const col = i % numCols
        d.layout.x = col * cellSize + 0.5 * cellSize

        // As i increments, row is calculated by dividing i by numCols and rounding down
        const row = Math.floor(i / numCols)
        d.layout.y = row * cellSize + 0.5 * cellSize

        // Radius calculated using scale function
        d.layout.entrantsRadius = rScale(d.Entrants)
      })
    }

    layout(state.chartData)

    // Select the first HTML or SVG element that matches the CSS selector
    d3.select('svg g.chart')

      // Make selection of all circles within initial selection
      // D3 will automatically add circles when the join occurs*
      .selectAll('circle')

      // Join the data array to the selection
      .data(state.chartData)

      // Create circle elements for each array element*
      .join('circle')

      .attr('cx', d => d.layout.x)
      .attr('cy', d => d.layout.y)
      .attr('r', d => d.layout.entrantsRadius)

      .style('fill', '#53c4da')
  }
}

const actions = {
  [types.FETCH_CHART_DATA]: async (context) => {
    context.commit(types.SET_CHART_LOADING_STATUS)

    await client.fetchData()
      .then(response => {
        context.commit(types.SET_CHART_LOADING_STATUS)
        context.commit(types.SET_CHART_DATA, response)
        context.commit(
          types.UPDATE_CHART_DATA,
          context.getters.getChartData,
          { root: true }
        )
      })
      .catch(error => context.commit(types.SET_CHART_ERROR, error.message))
      .finally(() => context.commit(types.SET_CHART_LOADING_STATUS))
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
