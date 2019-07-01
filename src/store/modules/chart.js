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
    // Select the first HTML or SVG element that matches the CSS selector
    d3.select('svg g.chart')

      // Make selection of all circles within initial selection
      // D3 will automatically add circles when the join occurs*
      .selectAll('circle')

      // Join the data array to the selection
      .data(state.chartData)

      // Create circle elements for each array element*
      .join('circle')

      // Set circle attributes (e.g., position, size)
      .attr('cx', 100)
      .attr('cy', 50)
      .attr('r', 10)
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