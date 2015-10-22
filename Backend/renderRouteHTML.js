
import React from "react"
import { RoutingContext, match } from 'react-router'
import routes from './public/build/routeBundle.js'
import createLocation from 'history/lib/createLocation'
import template from './templates/index.js'

import { Provider } from 'react-redux'
import store from '../_shared/store'

const hostname = process.env.HOSTNAME || "localhost"

export default function handleRouting(req, res) {

  const location = createLocation(req.path)

  match({ routes, location }, (error, redirectLocation, renderProps) => {

    if (redirectLocation) return console.log(`Tried to redirect to: ${redirectLocation}`)
    if (error) return res.status(500).end('Internal server error');
    if (renderProps == null) return res.status(404).end('Not found')

    const InitialView = (
      <Provider store={store}>
        {() =>
          <RoutingContext {...renderProps} />
        }
      </Provider>
    );

    const componentHTML = React.renderToString(InitialView);
    const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080"
    const initialState = store.getState();

    res.end(template(webserver, componentHTML, initialState));

  })

}

