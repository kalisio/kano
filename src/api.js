import apiHooks from './main.hooks'
import { kaelia } from 'kClient'

let api = kaelia()
// Setup app hooks
api.hooks(apiHooks)

export default api
