import style from './style.css'
import React from 'react'

export default React.createClass({

  render() {
    const source = require(`videos/${this.props.soti.file}`)
    return (
      <video loop={true} autoPlay={true}>
        <source src={source} type="video/mp4" />
      </video>
    )
  }

})
