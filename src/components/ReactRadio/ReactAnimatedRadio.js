import React, { Component } from "react";
import { TimelineMax, Power1, Elastic } from "gsap/TweenMax";

export default class ReactAnimatedRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweenLoaded: false,
      anticipateLoaded: false, 
      checked: this.props.checked
    };

    this.timeLine = new TimelineMax({ paused: true });
    this.introTimeLine = new TimelineMax({
      paused: false,
      onComplete: this.createInteraction
    });

    document.addEventListener('iamchanged' , this.props.onChange );
  }

  componentDidMount() {
    this.timeLine.timeScale(2.0);
    this.timeLine.progress(1);
  }

  createInteraction = () => {
    let selectorColorArray = [this.props.trueColor ? this.props.trueColor : '#4CAF50', this.props.falseColor ? this.props.falseColor : '#F44336' ];

    this.timeLine.to(this.lineSelectorRef, 0.5, {
        attr: {
          x2: 450
        },
        strokeWidth: 30,
        ease: Power1.easeIn
      })
      .from(this.hitLRef,1,
        {
          attr: {
            r: 30
          },
          //alpha:1,
          immediateRender: false,
          ease: Power1.easeOut
        },"-=0.5")
      .to(this.lineSelectorRef,1,
        {
          attr: {
            x1: 450
          },
          strokeWidth: 60,
          stroke: selectorColorArray[0],
          ease: Elastic.easeOut.config(1, 0.59)
        },"-=0.5")
      .to(this.baseRef,0.15,
        {
          attr: {
            x2: 460
          },
          repeat: 1,
          yoyo: true
        },"-=0.85")
      .to(this.baseRef,0.15,
        {
          attr: {
            x1: 348
          },
          repeat: 1,
          yoyo: true
        },"-=0.6")
      .addPause()
      .to(this.lineSelectorRef, 0.5, 
        {
          attr: {
            x1: 350
          },
          strokeWidth: 30,
          ease: Power1.easeIn
        })
      .from(this.hitRRef,1,
        {
          attr: {
            r: 30
          },
          //alpha:1,
          immediateRender: false,
          ease: Power1.easeOut
        },"-=0.5"
      )
      .to(this.lineSelectorRef,1,
        {
          attr: {
            x2: 350
          },
          strokeWidth: 60,
          stroke: selectorColorArray[1],
          ease: Elastic.easeOut.config(1, 0.59)
        },"-=0.5")
      .to(this.baseRef,0.15,
        {
          attr: {
            x1: 340
          },
          repeat: 1,
          yoyo: true
        },"-=0.85")
      .to(this.baseRef,0.15,
        {
          attr: {
            x2: 452
          },
          repeat: 1,
          yoyo: true
        },"-=0.6");
  };



  onHitAreaClick = event => {
    if (this.timeLine.time() === this.timeLine.duration()) {
      this.timeLine.play(0);
      let event = new Event('iamchanged', {bubbles: true});
      event.simulated = true; 
      document.querySelector('#base').value = true;
      document.querySelector('#base').dispatchEvent(event); 
    } else {
      this.timeLine.play();
      let event = new Event('iamchanged', {bubbles: true});
      event.simulated = true; 
      document.querySelector('#base').value = false;
      document.querySelector('#base').dispatchEvent(event);
    }
  };

  render() {

    this.state.checked ? this.timeLine.play(0) : this.timeLine.reversed();
    return (
      <div style={{ cursor: "pointer" }}>
        {" "}
        <svg
          width={this.props.width ? this.props.width : 60}
          height={this.props.width ? this.props.width/2 : 60/2}
          viewBox="360 225 165 150"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            ref={base => (this.baseRef = base)}
            id="base"
            fill="none"
            stroke={this.props.baseColor ? this.props.baseColor : "#383838"}
            strokeWidth="100"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="350"
            y1="300"
            x2="450"
            y2="300"
          />
          <line
            ref={lineSelector => (this.lineSelectorRef = lineSelector)}
            id="lineSelector"
            fill="none"
            stroke={this.state.checked ? (this.props.trueColor ? this.props.trueColor : '#4CAF50') : (this.props.falseColor ? this.props.falseColor : '#F44336')}
            strokeWidth="60"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="350"
            y1="300"
            x2="350"
            y2="300"
          />
          <circle
            ref={hitL => (this.hitLRef = hitL)}
            id="hitL"
            cx="350"
            cy="300"
            r="40"
            fill="#EEE"
            opacity="0"
          />
          <circle
            ref={hitR => (this.hitRRef = hitR)}
            id="hitR"
            cx="450"
            cy="300"
            r="40"
            fill="#EEE"
            opacity="0"
          />
          <line
            ref={hitArea => (this.hitAreaRef = hitArea)}
            onClick={this.onHitAreaClick}
            id={`hitArea`}
            fill="none"
            stroke="transparent"
            strokeWidth="100"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="350"
            y1="300"
            x2="450"
            y2="300"
          />
        </svg>{" "}
      </div>
    );
  }
}
