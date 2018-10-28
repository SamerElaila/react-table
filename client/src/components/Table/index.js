import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import generateTableColumns from '../../utils/generateTableColumns';
import generateClasses from '../../utils/generateClasses';
import generateHeaderClasses from '../../utils/generateHeaderClasses';
import concatData from '../../utils/concatData';

class Table extends Component {
  state = {
    startTime: Date.now(),
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

  changeHeaderStyle = (state, rowInfo, column, instance) =>
    console.log({ rowInfo }) || {
      className: generateHeaderClasses(column)
    };

  changeRowStyle = (_, rowInfo = { original: {} }) => {
    const res = {};
    try {
      const {
        original: { Bold: bold = 'normal', Background: background }
      } = rowInfo;
      res.style = {
        fontWeight: bold,
        backgroundColor: `rgba(0, 0, 0, ${background / 255})`
      };
    } catch (e) {
      console.log(e);
    }
    return res;
  };

  componentDidMount() {
    const {
      updateDimensions
      // startTimer,
      // props: { getData }
    } = this;
    window.addEventListener('resize', updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const {
      props: { data, currentPage },
      state: { columns, width },
      changeRowStyle,
      changeCellStyle,
      changeHeaderStyle
    } = this;
    const generatedColumns = generateTableColumns(columns, width);

    const style = {
      width: `${generatedColumns.length * 100}px`,
      margin: 'auto',
      maxWidth: `${generatedColumns.length * 100}px`
    };

    return (
      <ReactTable
        style={style}
        data={concatData(data)}
        columns={generatedColumns}
        getTrProps={changeRowStyle}
        getTdProps={changeCellStyle}
        getTheadThProps={changeHeaderStyle}
        showPagination={true}
        showPageSizeOptions={false}
        pageSize={data[currentPage].length}
        nextText=">>"
        previousText="<<"
        defaultPage={currentPage - 1}
      />
    );
  }
}

export default Table;
