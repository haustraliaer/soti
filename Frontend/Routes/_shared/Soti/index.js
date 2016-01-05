import style from './style.css'
import React from 'react'
import ui from 'popmotion'

export default React.createClass({

  componentDidMount() {

    const initialValues = (this.props.fade) ? {
      opacity: 0
    } : {
      opacity: 0,
      y: (this.props.goingDown) ? 100 : -100
    }

    var sotiActor = new ui.Actor({
      element: this.refs.soti,
      values: initialValues
    });

    var sotiTween = new ui.Tween({
        values: {
          opacity: 1.0,
          y: 0
        }
    });

    sotiActor.start(sotiTween.extend({
        duration: 500,
        ease: 'backOut'
    }));
  },

  render() {
    const video = require(`videos/${this.props.soti.filekey}.mp4`)
    const poster = require(`img/poster__${this.props.soti.filekey}.png`)
    return (
      <video ref='soti' loop={true} autoPlay={true} poster={poster}>
        <source src={video} type="video/mp4" />
      </video>
    )
  }

})
