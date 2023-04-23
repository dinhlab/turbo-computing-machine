// Import the axios library to make HTTP requests
import axios from 'axios'
// Import the base URL from the config file
import { BASE_URL } from './config'
// Create a new instance of axios with the base URL as its default baseURL
const apiService = axios.create({
  baseURL: BASE_URL
})
// Add an interceptor to log the start of each request
apiService.interceptors.request.use(
  (request) => {
    console.log('Start Request', request)
    return request
  },
  function (error) {
    console.log('REQUEST ERROR', error)
    return Promise.reject(error)
  }
)
// Add an interceptor to log the response of each request
apiService.interceptors.response.use(
  (response) => {
    console.log('Response', response)
    return response
  },
  function (error) {
    console.log('RESPONSE ERROR', error)
    return Promise.reject(error)
  }
)
// Export the apiService instance as the default export of this module
export default apiService
