import React, { Component } from 'react';
import PropTypes from 'prop-types';


function SelectLanguage(props) {
    let languages = ['All', 'JavaScript', 'ReactJs', 'Swift', 'PHP', 'CSS'];
    return (
        <ul className='languages'>
            {languages.map(language =>
                <li
                    style={language === props.selectedLanguage ? { color : '#d0021b'} : null}
                    onClick={props.onSelect.bind(null, language)}
                    key={language}>{language}
                </li>
            )}
        </ul>
    );
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

class Popular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage : 'All',
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(lang) {
        this.setState(() => ({
            selectedLanguage: lang
        }));
    }

    render() {
        return (
            <div>
                <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage}/>
            </div>

        );
    }
}

export default Popular;
