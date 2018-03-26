import React, { Component } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import Konva from 'konva';
import './App.css';

const PointsLin = ({ points }) => (
  <Line
    stroke={"black"}
    points={points}
  />
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touchStart: null,
      currentTouch: null,
      touchEnd: null,
      isTouching: false,
      swipe: null,
      swipePath: null,
    };
  }

  onMouseDown = (e) => {
    e.preventDefault();

    const newTouch = [
      e.pageX || e.touches[0].pageX,
      e.pageY || e.touches[0].pageY
    ];

    this.setState({
      isTouching: this.state.isTouching || true,
      touchStart: this.state.isTouching ?
                  newTouch : this.state.touchStart,
      currentTouch: newTouch
    });
  };

  onMouseUp = (e) => {
    e.preventDefault();

    this.setState({
      isTouching: false,
      currentTouch: null,
      swipe: null
    });
  };

  render() {
    return (
      <div className="AppContainer">
      <Stage
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}

        onMouseUp={this.onMouseUp}
        onTouchEnd={this.onMouseUp}

        width={window.innerWidth - 20}
        height={window.innerHeight - 20}>
          <Layer>
            {this.state.swipe ?
              <SwipeLine e={this.state.swipe} /> : null}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default App;
