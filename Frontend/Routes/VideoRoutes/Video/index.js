import React from "react"
import style from './style.css'

export default React.createClass({

	render() {
    const video = this.props.route.video
		return (
			<div className={style.root}>
				{video.title}


			</div>
		)
	}
})

