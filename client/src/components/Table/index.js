import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import generateTableColumns from '../../utils/generateTableColumns';

class Table extends Component {
    state = {
        data: [],
        columns: ['Symbol', 'Trend', 'Current', 'fresh', 'Chg', 'Crowd', 'BetaAlpha']
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
    }

    changeRowStyle = (_, rowInfo = {original: {}}) => {
        const res = {};
        try {
            const { original: { Bold: bold, Color: color, Background: background } } = rowInfo;
            res.className = `${bold || ''} ${color || ''} ${background || ''}`;
        }catch(e){
            console.log(e);
        }
        return res;
    }


    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);

        axios.get('http://sherwin.retailscience.ca:5000/').then(response => {
            this.setState({data: response.data.recordset});
        }).catch(err => {
            console.log(err);
        });
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
                showPagination={false}
                pageSize={data.length}
            />
        )        
    }
}

export default Table;