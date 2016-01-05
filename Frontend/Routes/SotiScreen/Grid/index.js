import style from './style.css'

import React from "react"
import { Link } from 'react-router'
import Soti from 'Soti'
import sotiData from '_data/sotis'

export default React.createClass({

	render() {
		return (
			<div className={style.root}>
        <button className={style.closeBtn} onClick={this.props.toggleGrid}>x</button>
        <div className={style.sotiGrid}>
  				{this.renderSotiList()}
        </div>
			</div>
		)
	},

  renderSotiList() {
    return sotiData.map((soti, index) => {
      const poster = require(`img/poster__${soti.filekey}.png`)
      return (
        <button
          key={soti.id}
          className={style.sotiBtn}
          onClick={() => this.props.onGridLink(soti.id)}>
            <Soti soti={soti} />
        </button>
      )
    })
  }
})

