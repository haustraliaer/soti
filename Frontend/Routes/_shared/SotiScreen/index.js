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
        <div className={style.prevLink}>
          {this.renderPrevLink(soti)}
        </div>
        <div className={style.soti}>
  				<Soti key={soti.id} soti={soti} />
        </div>
        <div className={style.nextLink}>
          {this.renderNextLink(soti)}
        </div>
			</div>
		)
	},

  renderPrevLink(soti) {
    switch(soti.id) {
      case '1':
        return (
          <div className={style.logo}>
            <img src={sotiLogo} />
          </div>
        )
      case '2':
        return (
          <Link to='/'>prev</Link>
        )
      default:
        return (
          <Link to={`/${+soti.id - 1}`}>prev</Link>
        )
    }
  },

  renderNextLink(soti) {
    const lastSoti = sotiData[sotiData.length - 1].id
    return (lastSoti === soti.id) ? null : (
      <Link to={`/${+soti.id + 1}`}>next</Link>
    )
  }
})

