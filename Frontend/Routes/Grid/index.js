import React from "react"
import style from './style.css'
import Soti from 'Soti'
import sotiData from '_data/sotis'

export default React.createClass({

	render() {
		return (
			<div className={style.root}>
				{this.renderSotiList()}
			</div>
		)
	},

  renderSotiList() {
    return sotiData.map((soti, index) => {
      return (
        <Soti key={index} soti={soti} />
      )
    })
  }
})

