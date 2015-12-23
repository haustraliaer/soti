import style from './style.css'
import React from 'react'
import sotiPoster from 'img/sotiPoster.png'
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
    const source = require(`videos/${this.props.soti.file}`)
    return (
      <video ref='soti' loop={true} autoPlay={true} poster={sotiPoster}>
        <source src={source} type="video/mp4" />
      </video>
    )
  }

})
