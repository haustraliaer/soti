import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Main from './Main'
import List from './List'
import Grid from './Grid'
import VideoRoutes from './VideoRoutes'

export default (
  <Route path='/' component={Main}>
    <IndexRoute component={List} />
    <Route path='grid' component={Grid} />
    {VideoRoutes}
  </Route>
)
