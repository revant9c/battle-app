import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Excel extends Component {
    constructor(props) {
        super(props);
        this.state = {data: props.data};
        this.sortTableData = this.sortTableData.bind(this);
    }

    sortTableData(event) {
        const columnName = event.target.cellIndex,
            data = Array.from(this.state.data);

        data.sort((a, b) => a[columnName] > b[columnName] ? 1 : -1);

        this.setState({
            data: data
        })
    }

    render () {
        const headers = this.props.headers;

        return (
            <div>
                <table>
                    <thead onClick={this.sortTableData}>
                        <tr>
                            {headers.map((title, id) => <th key={id}>{title}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.data.map((tRow, id) =>
                        <tr key={id}>
                            {tRow.map((tData, id) => <td key={id}>{tData}</td>)}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }

}

Excel.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};


export default Excel;