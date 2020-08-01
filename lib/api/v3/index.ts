import axios from 'axios'

export const baseURL = process.env.BASE_URL + '/api/v3'
export const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'X-CSRF-Token': 'relaym' }
})
