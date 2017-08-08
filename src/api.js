import apiHooks from './main.hooks'
import { kaelia } from 'kCore/client'

let api = kaelia()
// Setup app hooks
api.hooks(apiHooks)

export default api
