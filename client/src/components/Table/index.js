import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import generateTableColumns from '../../utils/generateTableColumns';
import generateClasses from '../../utils/generateClasses';


class Table extends Component {
    state = {
        data: [],
        columns: ['Symbol', 'Pattern', 'Current', 'WaveLength', 'Chg', 'Crowd', 'BetaAlpha']
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
    }

    changeCellStyle = (state, rowInfo, column, instance) => {
        // console.log({state, rowInfo, column, instance});
        return {
            className: generateClasses(rowInfo, column)
        };
    }

    changeRowStyle = (_, rowInfo = {original: {}}) => {
        const res = {};
        try {
            const { original: { Bold: bold,  Background: background } } = rowInfo;
            res.style = {
                fontWeight: bold ? 'bold' : 'normal',
                backgroundColor: `rgba(0, 0, 0, ${background / 255})`
            };
        }catch(e){
            console.log(e);
        }
        return res;
    }


    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);

        axios.get('https://cors-anywhere.herokuapp.com/http://sherwin.retailscience.ca:5000/').then(response => {
            this.setState({data: response.data.recordset});
        }).catch(err => {
            console.log(err);
        });

        // "https://cors-anywhere.herokuapp.com/http://sherwin.retailscience.ca:5000/"
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateDimensions);
    }

    render(){
        const { data, columns, width } = this.state;

        return (
            <ReactTable
                data={data}
                columns={generateTableColumns(columns, width)}
                getTrProps={this.changeRowStyle}
                getTdProps={this.changeCellStyle}
                showPagination={false}
                pageSize={data.length}
            />
        )        
    }
}

export default Table;
