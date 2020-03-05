import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Repos from "./components/repos";
import Repo from "./components/repo";

import { isAuthenticated } from './services/auth';

const PrivateRoute = ({ component : Component, ...rest} ) => (
    <Route 
        {...rest }
        render = { props => 
            isAuthenticated()  
                ? ( <Component { ...props }/> )
                : ( <Redirect to={{pathname: "/401", state: {from: props.location}}} />)             
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Repos}></Route>
            <Route exact path="/repos" component={Repos}></Route>
            <Route path="/repos/:id" component={Repo}></Route>

            <PrivateRoute path="/blocked" component={Repos}></PrivateRoute>
        </Switch>
    </BrowserRouter>
)

export default Routes;
