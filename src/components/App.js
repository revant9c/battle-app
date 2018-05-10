import React, { Component } from 'react';
import Popular from './Popular';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './nav';
import Home from './home';
import Battle from './Battle';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/popular" component={Popular} />
                        <Route exact path="/battle" component={Battle} />
                        <Route render={() => <p>Not found</p>} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
