/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable global-require */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
import React from 'react';

import { Switch } from 'react-router-dom';

import GlobalStyle from '@app/global-styles';

import Main from '../Main/Loadable';
import { Login, Register, Manage } from '../Auth/Loadable';
import Home from '../Home/Loadable';

import Toasts from '../Global/Toasts';

import NotFound from '../NotFound/Loadable';

import CustomRoute from '../Route';

export function App() {
  return (
    <div>
      <Switch>
        <CustomRoute
          exact
          container={Home}
          containerType="native"
          routeType="not_connected"
          path="/hello"
        />

        <CustomRoute
          exact
          container={Login}
          containerType="native"
          routeType="not_connected"
          path="/login"
        />
        <CustomRoute
          exact
          container={Register}
          containerType="native"
          routeType="not_connected"
          path="/register"
        />
        <CustomRoute
          exact
          nav
          container={Main}
          containerType="native"
          routeType="user_connected"
          path="/"
        />
        <CustomRoute
          exact
          nav
          container={Manage}
          containerType="native"
          routeType="user_connected"
          path="/user/manage"
        />

        <CustomRoute
          container={NotFound}
          containerType="native"
          routeType="normal"
        />
      </Switch>
      <Toasts />
      <GlobalStyle />
    </div>
  );
}

export default App;
