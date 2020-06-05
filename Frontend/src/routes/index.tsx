/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import CreatePoint from '../pages/CreatePoint';

const Routes = () => (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={Dashboard} path="/dashboard" isPrivate />
    <Route component={CreatePoint} path="/create-point" isPrivate />
  </Switch>
);

export default Routes;
