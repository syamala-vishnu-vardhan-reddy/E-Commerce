import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

import store from './store/store' // Import your Redux store
import App from './App'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found!')
}

createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
