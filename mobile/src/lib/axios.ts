import axios from 'axios'

export const api = axios.create({
  baseURL : "http://192.168.3.80:3333"
})