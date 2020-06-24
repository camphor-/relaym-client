import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.BASE_URL + '/api/v3',
  withCredentials: true,
  headers: { 'X-CSRF-Token': 'relaym' }
})
