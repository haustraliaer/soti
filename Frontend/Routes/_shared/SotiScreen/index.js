import React from "react"
import style from './style.css'
import { Link } from 'react-router'
import Soti from 'Soti'
import sotiLogo from 'img/soti.gif'
import sotiData from '_data/sotis'

export default React.createClass({

	render() {
    const soti = this.props.route.soti
		return (
			<div className={style.root}>
        <div className={style.logo}>
          {this.renderTopLink(soti)}
        </div>
        <div className={style.soti}>
  				<Soti key={soti.id} soti={soti} />
        </div>
        {this.renderBottomLink(soti)}
			</div>
		)
	},

  renderTopLink(soti) {
    switch(soti.id) {
      case '1':
        return (
          <img src={sotiLogo} />
        )
      case '2':
        return (
          <Link to='/'>Previous Soti</Link>
        )
      default:
        return (
          <Link to={`/${+soti.id - 1}`}>Previous Soti</Link>
        )
    }
  },

  renderBottomLink(soti) {
    const lastSoti = sotiData[sotiData.length - 1].id
    return (lastSoti === soti.id) ? null : (
      <Link to={`/${+soti.id + 1}`}>Next Soti</Link>
    )
  }
})

