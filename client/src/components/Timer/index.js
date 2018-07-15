import React from 'react';
import PropTypes from 'prop-types';

import RefreshTimer from './RefreshTimer';

const Timer = props => (
  <div className="timer">
    <RefreshTimer />
    <div>
      Last updated at: {new Date(props.lastRefreshTime).toLocaleTimeString()}
    </div>
  </div>
);

Timer.propTypes = {
  lastRefreshTime: PropTypes.number,
  startTime: PropTypes.number
};

export default Timer;
