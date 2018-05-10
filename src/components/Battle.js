import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function PlayerPreview (props) {
    return (
        <div>
            <div className='column'>
                <img
                    className='avatar'
                    src={props.avatar}
                    alt={`Avatar for ${props.username}`} />
                <h2 className='username'>@{props.username}</h2>
            </div>
            <button
                className='reset'
                onClick={props.onReset.bind(null, props.id)}>
                Reset
            </button>

        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
};




class PlayerInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let username = event.target.value;

        this.setState(() => ({username: username}));
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.props.id, this.state.username)

    }

    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off'
                    value={this.state.username}
                    onChange={this.handleChange}
                />

                <button
                    type='submit'
                    className='button'
                    disabled={!this.state.username} >
                    Submit
                </button>
            </form>

        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};


class Battle extends Component {
    constructor(props){
        super(props);

        this.state = {
            playerOneName: '',
            playerOneImage: null,
            playerTwoName: '',
            playerTwoImage: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username) {
        this.setState(() => {
            let newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = "https://github.com/" + username + '.png?size=200';
            return newState;
        });
    }

    handleReset(id) {
        this.setState(() => {
           let newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        });

    }

    render() {
        let playerOneName = this.state.playerOneName,
            playerTwoName = this.state.playerTwoName,
            playerOneImage = this.state.playerOneImage,
            playerTwoImage = this.state.playerTwoImage,
            match = this.props.match;

        return (
            <div>
                <div className="row">
                    {!playerOneName &&
                        <PlayerInput
                            id = 'playerOne'
                            label = 'Player One'
                            onSubmit = {this.handleSubmit}
                        />
                    }
                    {playerOneImage &&
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName}
                            id='playerOne'
                            onReset={this.handleReset}/>
                    }
                    {!playerTwoName &&
                        <PlayerInput
                            id = 'playerTwo'
                            label = 'Player Two'
                            onSubmit = {this.handleSubmit}
                        />
                    }
                    { playerTwoImage &&
                    <PlayerPreview
                        avatar={playerTwoImage}
                        username={playerTwoName}
                        id='playerTwo'
                        onReset={this.handleReset}/>
                    }
                </div>

                {playerOneImage && playerTwoImage &&
                    <Link
                        className='button'
                        to={{
                            pathname: match.url + '/results',
                            search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
                        }}>
                        Battle
                    </Link>
                }
            </div>
        )
    }
}

export default Battle;