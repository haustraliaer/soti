import React from 'react'
import { Route, IndexRoute } from 'react-router'
import videoData from '_data/videos'
import Video from './Video'

export default videoData.map((video, index) => {
  return (
    <Route
      key={index}
      path={video.path}
      video={video}
      component={Video} />
  )
})
