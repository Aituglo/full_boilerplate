/* eslint-disable no-nested-ternary */
/**
 *
 * AdminConnected
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { getMessage } from '@app/i18n';
import { Redirect, Route } from 'react-router-dom';
import Loader from '@app/components/Loader';
import Nav from '@app/containers/Nav/Loadable';

import { useInjectSaga } from '@app/utils/injectSaga';
import saga from '../saga';

export default function AdminConnected({
  verifyTokenFunc,
  logoutUserFunc,
  isAuthenticated,
  isAuthenticating,
  toastFunc,
  user,
  path,
  containerType,
  container: Container,
  ...rest
}) {
  useInjectSaga({ key: 'currentUser', saga });

  const token = localStorage.getItem('access_token');

  const isAdmin = currentUser => {
    if (currentUser.account_type !== 1) {
      toastFunc({
        text: getMessage(
          currentUser.language.substring(0, 2),
          'app.global.no_access',
        ),
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    verifyTokenFunc();
  }, [token]);

  return (
    <div>
      {isAuthenticating ? (
        <Loader />
      ) : isAuthenticated ? (
        isAdmin(user) ? (
          <div>
            {rest.nav && <Nav user={user} logoutUserFunc={logoutUserFunc} />}
            <div className={rest.nav && 'main-container container'}>
              <Route
                {...rest}
                path={path}
                render={props => <Container user={user} {...props} />}
              />
            </div>
          </div>
        ) : (
          <Redirect to="/" />
        )
      ) : (
        <Redirect to="/hello" />
      )}
    </div>
  );
}

AdminConnected.propTypes = {
  toastFunc: PropTypes.func,
  verifyTokenFunc: PropTypes.func,
  logoutUserFunc: PropTypes.func,
  path: PropTypes.string,
  container: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  isAuthenticating: PropTypes.bool,
  containerType: PropTypes.string,
  user: PropTypes.object,
};
