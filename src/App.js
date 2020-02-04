import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from 'react-router-dom';

export default class App extends React.Component
{
    render() {
        return (
            <h1>Hola mundo!</h1>
        );
    }
}