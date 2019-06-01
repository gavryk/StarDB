import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from '../error-boundry';
import DummySwapiService from '../../services/dummy-swapi-service';
import { PeoplePage,
        PlanetsPage,
        StarshipsPage,
        LogInPage,
        SecretPage } from '../pages';
import StarshipDetails from "../sw-components/starship-details";

import { SwapiServiceProvider } from "../swapi-service-context";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import './app.css';

export default class App extends Component {


    state = {
        swapiService: new SwapiService(),
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {
            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

            console.log('switched to ', Service.name);

            return {
                swapiService: new Service()
            }
        })
    };

    render() {
        const { isLoggedIn } = this.state;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={ this.state.swapiService }>
                    <Router>
                        <div className='container'>
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet />

                            <Switch>
                                <Route path="/"
                                       render={() => <h2>Welcome to StarDB</h2>}
                                       exact/>
                                <Route path="/people/:id?"
                                       component={PeoplePage}
                                />
                                <Route path="/planets" component={PlanetsPage} />
                                <Route path="/starships" exact component={StarshipsPage} />
                                <Route path="/starships/:id"
                                       render={({ match }) => {
                                           const { id } = match.params;
                                           return <StarshipDetails itemId={ id } />
                                       }}/>
                                <Route
                                    path="/login"
                                    render={() => (
                                        <LogInPage
                                            isLoggedIn={isLoggedIn}
                                            onLogin={this.onLogin}
                                        />
                                    )}
                                />
                                <Route
                                    path='/secret'
                                    render={() => (
                                        <SecretPage isLoggedIn={isLoggedIn}/>
                                    )}
                                />
                                <Redirect to='/' />
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        )
    }
};
