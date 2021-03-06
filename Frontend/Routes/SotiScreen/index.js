
import style from './style.css'
import sotiLogo from 'img/soti.gif'
import sotiData from '_data/sotis'

import React from "react"
import hotkey from 'react-hotkey'
import { History, Link } from 'react-router'
import Icon from 'Icon'
import Soti from 'Soti'

import Grid from './Grid'

import Portal from 'Portal'

if(__CLIENT__) {
  hotkey.activate('keydown');
}

export default React.createClass({

  mixins: [
    History,
    hotkey.Mixin('handleHotkey')
  ],

  getInitialState() {
    return {
      fade: true,
      goingDown: false,
      gridOpen: false
    }
  },

  handleHotkey(e) {
    const soti = this.props.route.soti
    switch(e.keyCode) {
      case 38:
        e.preventDefault()
        if(+soti.id === 1) return
        return this.handlePrevClick(soti.id)
      case 40:
        e.preventDefault()
        const lastSoti = sotiData[sotiData.length - 1].id
        if(soti.id === lastSoti) return
        return this.handleNextClick()
    }
  },

  handleGridLink(id) {
    this.setState({
      gridOpen: false
    }, () => this.history.pushState(null, (+id === 1) ? '/' : `/${+id}`))
  },

  toggleGrid() {
    this.setState({
      gridOpen: !this.state.gridOpen
    })
  },

	render() {
    const soti = this.props.route.soti
		return (
			<div className={style.root}>

        <button className={style.gridBtn} onClick={this.toggleGrid}>grid</button>

        <Portal
          isOpen={this.state.gridOpen}>

            <Grid
              history={this.props.history}
              toggleGrid={this.toggleGrid}
              onGridLink={this.handleGridLink} />

        </Portal>

        <div className={style.prevLink}>
          {this.renderPrevLink(soti)}
        </div>
        <div className={style.soti}>
  				<Soti
            key={soti.id}
            soti={soti}
            fade={this.state.fade}
            goingDown={this.state.goingDown} />
        </div>
        <div className={style.nextLink}>
          {this.renderNextLink(soti)}
        </div>
			</div>
		)
	},

  handlePrevClick(id) {
    this.setState({
      fade: false,
      goingDown: false
    }, () => this.history.pushState(null, (+id === 2) ? '/' : `/${+id - 1}`))
  },

  handleNextClick() {
    const id = this.props.route.soti.id
    this.setState({
      fade: false,
      goingDown: true
    }, () => this.history.pushState(null, `/${+id + 1}`))
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
          <button className={style.button} onClick={() => this.handlePrevClick(soti.id)}>
            {this.renderPrevIcon()}
          </button>
        )
      default:
        return (
          <button className={style.button} onClick={() => this.handlePrevClick(soti.id)}>
            {this.renderPrevIcon()}
          </button>
        )
    }
  },

  renderPrevIcon() {
    return (
      <Icon id="caret_up" classes={{ icon: style.icon }} />
    )
  },

  renderNextLink(soti) {
    const lastSoti = sotiData[sotiData.length - 1].id
    return (lastSoti === soti.id) ? null : (
      <button className={style.button} onClick={this.handleNextClick}>
        <Icon id="caret_down" classes={{ icon: style.icon }} />
      </button>
    )
  },

})

