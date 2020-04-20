import axios from 'axios'

export const instance = axios.create({
  baseURL: process.env.BASE_URL + '/api/v2'
})
instance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => Promise.resolve(error.response)
)

class BaseError extends Error {
  constructor(...args) {
    super(JSON.stringify(args))

    // this.name = this.constructor.name; でも問題ないが、
    // enumerable を false にしたほうがビルトインエラーに近づく、
    Object.defineProperty(this, 'name', {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true
    })

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError)
    }
  }
}

export class ApiException extends BaseError {
  public readonly statusCode
  public readonly msg

  constructor(statusCode, msg) {
    super({ statusCode, msg })

    this.statusCode = statusCode
    this.msg = msg
  }
}

export interface ErrorResponse {
  msg: string
}
