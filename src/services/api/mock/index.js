import tourDeFrance from '@/services/api/mock/data/tourDeFrance'

const fetch = (promise, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(promise))
  }, time)
}

export default {
  fetchData () {
    return fetch(tourDeFrance, 1000)
  }
}
