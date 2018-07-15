import React, { Component } from 'react';
import './App.css';

import Table from './components/Table';
import Timer from './components/Timer';

import fetchData from './utils/getData';
import shiftPages from './utils/shiftPages';

class App extends Component {
  state = {
    startTime: Date.now(),
    lastRefreshTime: Date.now(),
    counter: 0,
    currentPage: 1,
    shouldShift: false,
    data: {
      1: [],
      2: [],
      3: [],
      4: []
    }
  };

  changeLastRefreshTime = lastRefreshTime => {
    this.setState({ lastRefreshTime });
  };

  incrementCounter = () => {
    let { currentPage, counter } = this.state;
    const newCounter = counter + 1;
    switch (newCounter) {
      case 10:
        return { counter: newCounter, currentPage: 1 };
      case 20:
        return { counter: newCounter, currentPage: 2 };
      case 30:
        return { counter: newCounter, currentPage: 3 };
      case 40:
        return { counter: 0, currentPage: 4, shouldShiftPages: true };
      default:
        return { counter: newCounter, currentPage };
    }
  };

  getData = () => {
    fetchData()
      .then(res => {
        const { data, shouldShift } = this.state;
        const {
          counter,
          currentPage,
          shouldShiftPages
        } = this.incrementCounter();
        const newData = shouldShiftPages
          ? shiftPages(data, res)
          : { ...data, [currentPage]: res };
        this.setState({
          data: newData,
          counter,
          currentPage,
          shouldShift: shouldShiftPages ? true : shouldShift
        });
      })
      .catch(err => console.log(err));
  };

  startTimer = () => {
    setInterval(() => {
      this.getData();
    }, 30000);
  };

  componentDidMount() {
    const { startTimer, getData } = this;
    startTimer();
    getData();
  }

  render() {
    const {
      startTime,
      lastRefreshTime,
      counter,
      data,
      currentPage
    } = this.state;

    return (
      <div>
        <Timer startTime={startTime} lastRefreshTime={lastRefreshTime} />
        <Table
          startTime={startTime}
          changeRefreshTime={this.changeLastRefreshTime}
          incrementCounter={this.incrementCounter}
          counter={counter}
          data={data}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default App;
