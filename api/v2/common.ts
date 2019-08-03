import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.BASE_URL + '/api/v2'
})

export class ApiException {
  public readonly statusCode
  public readonly msg

  constructor(statusCode, msg) {
    this.statusCode = statusCode
    this.msg = msg
  }
}

export interface ErrorResponse {
  msg: string
}
