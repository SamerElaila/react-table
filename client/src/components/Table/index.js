import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import generateTableColumns from '../../utils/generateTableColumns';

class Table extends Component {
    state = {
        data: [],
        columns: []
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

        axios.get('/api/data').then(response => {
            this.setState({data: response.data.rows, columns: response.data.columns});
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
            />
        )        
    }
}

export default Table;