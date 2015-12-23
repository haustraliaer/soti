import React from 'react'
import { Route, IndexRoute } from 'react-router'
import RootContainer from './RootContainer'
import SotiScreen from './SotiScreen'
import sotiData from '_data/sotis'

const firstSoti = sotiData[0]
const sotis = sotiData.filter((soti, index) => index > 0)

export default (
  <Route path='/' component={RootContainer}>
    <IndexRoute
      component={SotiScreen}
      soti={firstSoti} />
    {mapVideoRoutes()}
  </Route>
)

function mapVideoRoutes() {
  return sotis.map((soti, index) => {
    return (
      <Route
        key={soti.id}
        path={soti.id}
        soti={soti}
        component={SotiScreen} />
    )
  })
}
