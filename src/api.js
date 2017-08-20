import apiHooks from './main.hooks'
import { kalisio } from 'kCore/client'

let api = kalisio()
// Setup app hooks
api.hooks(apiHooks)

export default api
