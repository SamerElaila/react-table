import React, { Component } from 'react';

class RefreshTimer extends Component {
  state = {
    time: 30
  };

  componentDidMount() {
    setInterval(() => {
      let time = this.state.time - 1;
      if (time === 0) time = 30;
      this.setState({ time: time });
    }, 1000);
  }

  render() {
    return <div>next refresh in: {this.state.time} seconds</div>;
  }
}

export default RefreshTimer;
