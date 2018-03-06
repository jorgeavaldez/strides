import React, { Component } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Konva from 'konva';
import Hammer from 'react-hammerjs';
import './App.css';

const swipeToPoints = (swipe) => {
  const {
    srcEvent,
    deltaTime,
    overallVelocityX,
    overallVelocityY,
    overallVelocity
  } = swipe;

  // srcEvent is actually the pointerUp moment
  // I think it might be good to keep this for sound
  // synthesis but in terms of drawing the actual line
  // I definitely need to do the built in event handlers
  const { clientX, clientY } = srcEvent;

  const startPoint = {
    x: clientX - overallVelocityX * deltaTime,
    y: clientY - overallVelocityY * deltaTime,
  };

  const endPoint = {
    x: startPoint.x + overallVelocityX * deltaTime,
    y: startPoint.y + overallVelocityY * deltaTime,
  };

  return [
    startPoint.x,
    startPoint.y,
    endPoint.x,
    endPoint.y,
  ];
};

const SwipeLine = ({ e }) => (
  <Line
    stroke={"black"}
    points={swipeToPoints( e )}
  />
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touchStart: null,
      currentTouch: null,
      lastTouchEvent: null,
      isTouching: false,
      swipe: null,
      swipePath: null,
    };
  }

  onSwipe = (e) => {
    e.preventDefault();
    console.dir(e);
    this.setState({
      swipe: e,
    });
  };

  onPress = (e) => {
    e.preventDefault();
    this.setState({
      isTouching: this.state.isTouching || true,
      touchStart: this.state.isTouching ? e : this.state.touchStart,
      currentTouch: e
    });
  };

  onPressUp = (e) => {
    e.preventDefault();
    this.setState({
      isTouching: false,
      currentTouch: null,
      swipe: null
    });
  };

  render() {
    return (
      <Hammer
        className="HammerContainer"
        onSwipe={this.onSwipe}
        action={this.onPress}
        onPressUp={this.onPressUp}>
        <div>
          <Stage width={window.innerWidth - 20} height={window.innerHeight - 20}>
            <Layer>
              {this.state.swipe ?
                <SwipeLine e={this.state.swipe} /> : null}
            </Layer>
          </Stage>
        </div>
      </Hammer>
    );
  }
}

export default App;
