import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    // useParams
} from 'react-router-dom';
import Header from './Header.js';
import './css/main.css';

export default class App extends React.Component
{
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Header} />
                </Switch>
            </Router>
        );
    }
}
