import React, { Component } from 'react'

class Battle extends Component {
    constructor(props){
        super(props);

        this.state = {
            playerOneName: '',
            playerOneImage: null,
            playerTwoName: '',
            playerTwoImage: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(id, username) {
        this.setState(() => {
            var newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = "https://github.com" + username + '.png?size=200';
        });
    }

    render() {
        return (
            <div>
                Battle
            </div>
        )
    }
}

export default Battle;