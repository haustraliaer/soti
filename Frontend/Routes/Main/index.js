import React from "react"
import style from './style.css'
import soti from 'img/soti.gif'

export default React.createClass({

	componentWillMount() {
		if (__SERVER__) {
			console.log("Hello server")
		}

		if (__CLIENT__) {
			console.log("Hello client")
		}
	},

	render() {
		return (
			<div className={style.root}>
				<img src={soti} />
				{this.props.children}
			</div>
		)
	}
})

