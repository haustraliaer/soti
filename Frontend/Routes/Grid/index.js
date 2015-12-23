import style from './style.css'

import React from "react"
import { Link } from 'react-router'
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
        <Link to={`/${soti.id}`}>
          <Soti key={index} soti={soti} />
        </Link>
      )
    })
  }
})

