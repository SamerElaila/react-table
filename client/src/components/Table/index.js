import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import generateTableColumns from '../../utils/generateTableColumns';
import generateClasses from '../../utils/generateClasses';
import generateHeaderClasses from '../../utils/generateHeaderClasses';

class Table extends Component {
  state = {
    data: [],
    width: window.innerWidth,
    columns: [
      'Symbol',
      'Pattern',
      'Current',
      'WaveLength',
      'Chg',
      'Crowd',
      'BetaAlpha'
    ]
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  changeCellStyle = (state, rowInfo, column, instance) => {
    return {
      className: generateClasses(rowInfo, column)
    };
  };

  changeHeaderStyle = (state, rowInfo, column, instance) => ({
    className: generateHeaderClasses(column)
  });

  changeRowStyle = (_, rowInfo = { original: {} }) => {
    const res = {};
    try {
      const {
        original: { Bold: bold, Background: background }
      } = rowInfo;
      res.style = {
        fontWeight: bold || 'normal',
        backgroundColor: `rgba(0, 0, 0, ${background / 255})`
      };
    } catch (e) {
      console.log(e);
    }
    return res;
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);

    axios
      .get('/api/get-data')
      .then(response => {
        this.setState({ data: response.data.recordset });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const { data, columns, width } = this.state;
    const generatedColumns = generateTableColumns(columns, width);

    const style = {
      width: `${generatedColumns.length * 100}px`,
      margin: 'auto',
      maxWidth: `${generatedColumns.length * 100}px`
    };

    return (
      <ReactTable
        style={style}
        data={data}
        columns={generatedColumns}
        getTrProps={this.changeRowStyle}
        getTdProps={this.changeCellStyle}
        getTheadThProps={this.changeHeaderStyle}
        showPagination={false}
        pageSize={data.length}
      />
    );
  }
}

export default Table;
