import React from 'react'
import style from './style.css'

export default React.createClass({

  getInitialState() {
    return {
      created: false,
    }
  },

  componentWillReceiveProps(newProps) {
    if(newProps.isOpen === this.props.isOpen) {
      if(!this.state.created) return
      return this.renderPortal(newProps)
    }
    if(newProps.isOpen) {
      this.setState({
        created: true
      })
      this.createPortal(newProps)

    } else {
      this.setState({
        created: false
      })
      this.destroyPortal()
    }
  },

  componentWillUnmount() {
    if(this.props.isOpen) {
      this.destroyPortal()
    }
  },

  getClass(className) {
    if(typeof this.props.classes === 'undefined'
      || typeof this.props.classes[className] === 'undefined') {
      return style[className]
    }

    return this.props.classes[className]
  },

  createPortal(props) {
    this.node = document.createElement('div')
    this.node.className = this.getClass('root')
    document.body.appendChild(this.node)
    this.renderPortal(props)
  },

  destroyPortal() {
    if(typeof this.node === "undefined") return
    document.body.removeChild(this.node)
  },

  renderPortal(props) {
    React.render(
      (
        <div className={this.getClass('content')}>
          {this.props.children}
        </div>
      ), this.node)
  },

  render() {
    return null
  }

})
