// style resets
import normalize from './css/normalize.css'
import base from './css/base.css'

// react & router
import React from "react"
import Router from "react-router"
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Routes from './Routes'

// ghetto store
import { Provider } from 'react-redux'
import store from 'store'

const reactApp = (
  <Provider store={store}>
    {() =>
      <Router history={createBrowserHistory()} routes={Routes} style={base} />
    }
  </Provider>
)

React.render(reactApp, document.body)
