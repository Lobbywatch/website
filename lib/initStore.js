import {createStore} from 'redux'
import getReducer from './reducer'
import createMiddleware from './middleware'

export const initStore = (client, initialState) => {
  let store
  if (!process.browser || !window.store) {
    const middleware = createMiddleware(client.middleware())
    store = createStore(getReducer(client), initialState, middleware)
    if (!process.browser) {
      return store
    }
    window.store = store
  }
  return window.store
}
