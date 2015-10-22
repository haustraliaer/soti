import React from "react"
import style from './style.css'
import videoData from '_data/videos'
import taro from 'img/taro-as-art.png'

export default React.createClass({

	render() {
		return (
			<div className={style.root}>
				{this.renderVideoList()}
			</div>
		)
	},

  renderVideoList() {
    return videoData.map((video, index) => {
      var source = require(`video/${video.file}`)
      return (
        <video key={index} loop={true}>
            <source src={source} type="video/mp4" />
        </video>
      )
    })
  }
})

