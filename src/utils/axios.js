import axiosFactory from 'axios'

export const axios = axiosFactory.create({
  baseURL: 'http://localhost:5050/api/v1'
})

axios.interceptors.request.use(setHeader)

function setHeader(config) {
  config.headers['Content-Type'] = 'application/json'
  return config
}
