import React, { Component } from 'react';
import Popular from './Popular';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Nav from './nav';
import Home from './home';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className='container'>
                    <Nav />
                    <Route exact path="/" component={Home} />
                    <Route path="/popular" component={Popular} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
