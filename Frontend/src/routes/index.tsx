/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routes';

import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import CreatePoint from '../pages/CreatePoint';
import Profile from '../pages/Profile';
import Users from '../pages/Users';
import AddUser from '../pages/AddUser';

const Routes = () => (
  <Switch>
    <Route component={Home} path="/" exact />
    <Route component={Dashboard} path="/dashboard" isPrivate />
    <Route component={Users} path="/users" isPrivate />

    <Route component={CreatePoint} path="/create-point" exact isPrivate />
    <Route component={CreatePoint} path="/create-point/:id" isPrivate />

    <Route component={Profile} path="/profile" exact isPrivate />
    <Route component={Profile} path="/profile/:id" isPrivate />

    <Route component={AddUser} path="/add-user" exact isPrivate />
  </Switch>
);

export default Routes;
