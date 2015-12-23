
import style from './style.css'
import iconList from './iconList'
import React from 'react'


export default React.createClass({

  getClass(className) {
    if(typeof this.props.classes === 'undefined'
      || typeof this.props.classes[className] === 'undefined') {
      return style[className]
    }

    return this.props.classes[className]
  },

  render() {
    return (
      <div
        className={this.getClass('icon')}
        dangerouslySetInnerHTML={{__html: iconList[this.props.id]}} />
    )
  }
})

