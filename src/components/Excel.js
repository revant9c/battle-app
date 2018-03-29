import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Excel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            sortBy: null,
            descending: false,
            edit: null
        };
        this.sortTableData = this.sortTableData.bind(this);
        this.changeSortIcon = this.changeSortIcon.bind(this);
        this.editTableData = this.editTableData.bind(this);
    }

    /**
     * Method to sort table data
     * @param event
     */
    sortTableData(event) {
        const columnName = event.target.cellIndex,
            data = Array.from(this.state.data);
        let descending = this.state.sortBy === columnName && !this.state.descending;

        data.sort((a, b) => descending ? a[columnName] < b[columnName] ? 1 : -1 : a[columnName] > b[columnName] ? 1 : -1);

        this.setState({
            data: data,
            sortBy: columnName,
            descending: descending,
        })
    }

    /**
     * Method to edit table cell data
     * @param event
     */
    editTableData(event) {
        this.setState({
            edit: {
                row: parseInt(event.target.dataset.row, 10),
                cell: event.target.cellIndex
            }
        })
    }

    /**
     * Method to change the icon when table header is clicked
     * @param title
     * @param headerId
     * @returns title
     */
    changeSortIcon(title, headerId) {
        if (this.state.sortBy === headerId) {
            title += this.state.descending ? '\u2193' : '\u2191'
        }
        return title;
    }

    render () {
        const headers = this.props.headers;

        return (
            <div>
                <table>
                    <thead onDoubleClick={this.sortTableData}>
                        <tr>
                            {headers.map((title, headerId) => <th key={headerId}>{this.changeSortIcon(title, headerId)}</th> )}
                        </tr>
                    </thead>
                    <tbody onClick={this.editTableData}>
                        {this.state.data.map((tRow, rowId) =>
                            <tr key={rowId}>
                                {tRow.map((tData, tdId) => <td data-row={rowId} key={tdId}>{tData}</td>)}
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