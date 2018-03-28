import React, { Component } from 'react';

class Excel extends Component {
    constructor(props) {
        super(props);
        this.state = {data: props.data};
    }

    render () {
        const headers = this.props.headers;

        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        {headers.map((title, id) => <th key={id}>{title}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.map((tRow, id) =>
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


export default Excel;