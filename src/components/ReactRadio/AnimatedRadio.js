import React, { Component } from 'react'

function select(s) {
    return document.querySelector(s);
}

export default class AnimatedRadio extends Component {


    constructor (props){
        super(props);
        this.state = {
            tweenLoaded: false, 
            anticipateLoaded: false,
        }
    }

    componentWillMount() {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.3/TweenMax.min.js";
        script.addEventListener('load' , this.TweenMaxLoaded );
        document.body.appendChild(script);

        const script2 = document.createElement("script");
        script2.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/AnticipateEase.min.js";
        script2.addEventListener('load' , this.AnticipateEaseLoaded );
        document.body.appendChild(script2);
    }

    TweenMaxLoaded = () => {
        console.log ('Tween Loaded');
        this.setState({tweenLoaded: true});
    }

    AnticipateEaseLoaded = () => {
        console.log("Anticipate Loaded");
        this.setState({ anticipateLoaded: true});
    }

    // componentWillUpdate(nextProps, nextState) {
    //     this.init();
    // }

    init = () => {

        var that = this;
        if (this.state.tweenLoaded && this.state.anticipateLoaded)
        {
            console.log ('Initialization Started');
            let lineSelector = select("#lineSelector");
            let hitArea = select("#hitArea");
            let hitL = select("#hitL");
            let hitR = select("#hitR");
            let base = select("#base");
            // let selectorColorArray = ["#4CAF50", "#F44336"];
            let selectorColorArray = [this.props.trueColor, this.props.falseColor];
            window.TweenMax.set("svg", {
            visibility: "visible"
            });

            let tl = new window.TimelineMax({ paused: true });
        
            let introTl = new window.TimelineMax({
                paused: false,
                onComplete: createInteraction
            });
          
            /* #region  introTl init */
        
            introTl
            .from(base, 0.4, {
                strokeWidth: 0,
                delay: 1
            })
            .from(
                lineSelector,
                0.2,
                {
                strokeWidth: 0
                },
                "-=0.2"
            )
            .from(base, 0.4, {
                attr: {
                x1: 400,
                x2: 400
                },
                ease: window.Anticipate.easeIn
            })
            .from(
                lineSelector,
                0.4,
                {
                attr: {
                    x1: 400,
                    x2: 400
                },
                ease: window.Anticipate.easeIn
                },
                "-=0.4"
            );
            /* #endregion */

            function createInteraction(){
                tl.to(lineSelector, 0.5, {
                  attr:{
                    x2:450
                  },
                  strokeWidth:30,
                  ease:window.Power1.easeIn
                })
                .from(hitL, 1, {
                  attr:{
                    r:30
                  },
                  //alpha:1,
                  immediateRender:false,
                  ease:window.Power1.easeOut
                },'-=0.5')
                .to(lineSelector, 1, {
                  attr:{
                    x1:450
                  },
                  strokeWidth:60,
                  stroke:selectorColorArray[0],
                  ease:window.Elastic.easeOut.config(1, 0.59)
                },'-=0.5')
                .to(base, 0.15,{
                  attr:{
                    x2:460
                  },
                  repeat:1,
                  yoyo:true
                },'-=0.85')
                .to(base, 0.15,{
                  attr:{
                    x1:348
                  },
                  repeat:1,
                  yoyo:true
                },'-=0.6')
              
                .addPause()
                .to(lineSelector, 0.5, {
                  attr:{
                    x1:350
                  },
                  strokeWidth:30,
                  ease:window.Power1.easeIn
                })
                .from(hitR, 1, {
                  attr:{
                    r:30
                  },
                  //alpha:1,
                  immediateRender:false,
                  ease:window.Power1.easeOut
                },'-=0.5')
                .to(lineSelector, 1, {
                  attr:{
                    x2:350
                  },
                  strokeWidth:60,
                  stroke:selectorColorArray[1],
                  ease:window.Elastic.easeOut.config(1, 0.59)
                },'-=0.5')
                .to(base, 0.15,{
                  attr:{
                    x1:340
                  },
                  repeat:1,
                  yoyo:true
                },'-=0.85')
                .to(base, 0.15,{
                  attr:{
                    x2:452
                  },
                  repeat:1,
                  yoyo:true
                },'-=0.6')
              
                hitArea.onclick = function(){
              
                  if(tl.time() === tl.duration()){
                    that.props.onPropertyChange('true');
                    tl.play(0);
                  } else {
                    that.props.onPropertyChange('false');
                    tl.play();
                  }
                }
              
                hitArea.ontouchstart = hitArea.onclick;
              
                tl.timeScale(2.0);
                //tl.progress(1);
                
              }
        }    
    };

    render() {
        this.init();
        return (
          this.state.tweenLoaded && <div style={{cursor: 'pointer'}}> <svg  width={60} height={30} viewBox='360 225 100 150' xmlns='http://www.w3.org/2000/svg'>
                <line ref={base => this.baseRef = base} id='base' fill='none' stroke='#263238' strokeWidth='100' strokeLinecap='round' strokeMiterlimit='10' x1='350' y1='300' x2='450' y2='300' />
                <line ref={lineSelector => this.lineSelectorRef = lineSelector} id='lineSelector' fill='none' stroke='#F44336' strokeWidth='60'strokeLinecap='round' strokeMiterlimit='10' x1='350' y1='300' x2='350' y2='300' />
                <circle ref={hitL => this.hitLRef = hitL} id='hitL' cx='350' cy='300' r='40' fill='#EEE' opacity='0' />
                <circle ref={hitR => this.hitRRef = hitR} id='hitR' cx='450' cy='300' r='40' fill='#EEE' opacity='0' />
                <line ref={hitArea => this.hitAreaRef = hitArea} id='hitArea' fill='none' stroke='transparent' strokeWidth='100' strokeLinecap='round' strokeMiterlimit='10' x1='350' y1='300' x2='450' y2='300' />
            </svg> </div> 
        )
    }
}
