import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Excel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            sortBy: null,
            descending: false,
            edit: null,
            search: false
        };
        this.sortTableData = this.sortTableData.bind(this);
        this.changeSortIcon = this.changeSortIcon.bind(this);
        this.editTableData = this.editTableData.bind(this);
        this.saveData = this.saveData.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
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
            descending: descending
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

    saveData(event) {
        event.preventDefault();
        let input = event.target.firstElementChild,
            data  = Array.from(this.state.data);

        data[this.state.edit.row][this.state.edit.cell] = input.value;

        this.setState({
            edit: null,
            data: data
        })
    }

    toggleSearch() {

    }

    render () {
        return (
            <div>
                {this._renderToolbar()}
                {this._renderTable()}
            </div>
        );
    }

    _renderSearch() {
        const headers = this.props.headers;
        if (!this.state.search) {
            return null;
        }

        return (
          <tr>
              {headers.map((_ignore, id) => <td key={id}><input data-id={id} type="text" /></td>)}
          </tr>
        );
    }

    _renderToolbar() {
        return (
          <div>
              <button onClick={this.toggleSearch}>Search</button>
          </div>
        );
    }

    _renderTable() {
        const headers = this.props.headers;
        return (
            <table>
                <thead onClick={this.sortTableData}>
                    <tr>
                        {headers.map((title, headerId) => <th key={headerId}>{this.changeSortIcon(title, headerId)}</th> )}
                    </tr>
                </thead>
                <tbody onDoubleClick={this.editTableData}>
                    {this._renderSearch()}
                    {this.state.data.map((tRow, rowId) =>
                        <tr key={rowId}>
                            {
                                tRow.map((tData, tdId) => {
                                    let content = tData;
                                    let edit = this.state.edit;
                                    if (edit && edit.row === rowId && edit.cell === tdId) {
                                        content = <form onSubmit={this.saveData}><input type="text" defaultValue={content} /></form>
                                        return <td data-row={rowId} key={tdId}>{content}</td>
                                    }
                                    return <td data-row={rowId} key={tdId}>{content}</td>
                                })
                            }
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

}

Excel.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};


export default Excel;