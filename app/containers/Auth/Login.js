/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from '@app/utils/injectSaga';
import { useInjectReducer } from '@app/utils/injectReducer';

import '@app/assets/css/auth.css';

import makeSelectAuth from './selectors';
import { loginUser, changeInput } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Login({ auth, onSubmitForm, onChangeInput }) {
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

  return (
    <div>
      <FormattedMessage {...messages.login_header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Login" />
          </Helmet>
        )}
      </FormattedMessage>
      <div className="section" />
      <main>
        <center>
          <div className="section" />
          <div className="section" />

          <div className="container">
            <div
              className="z-depth-1 grey lighten-4 row"
              style={{
                display: 'inline-block',
                padding: '32px 48px 0px 48px',
                border: '1px solid #EEE',
              }}
            >
              <div className="row">
                <div className="col s12" />
              </div>
              <form onSubmit={onSubmitForm} id="loginForm">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="email"
                      id="email"
                      className="validate"
                      value={auth.email}
                      onChange={evt => onChangeInput(evt, 'email')}
                    />

                    <label htmlFor="email">
                      <FormattedMessage {...messages.email} />
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      type="password"
                      id="password"
                      className="validate"
                      value={auth.password}
                      onChange={evt => onChangeInput(evt, 'password')}
                    />

                    <label htmlFor="password">
                      <FormattedMessage {...messages.password} />
                    </label>
                  </div>
                </div>

                <br />
                <center>
                  <div className="row">
                    <button
                      type="submit"
                      name="btn_login"
                      className="col s12 btn btn-large waves-effect indigo"
                    >
                      <FormattedMessage id="app.global.submit" />
                    </button>
                  </div>
                </center>
              </form>
            </div>
          </div>
          <Link to="/register">
            <FormattedMessage {...messages.register} />
          </Link>
        </center>

        <div className="section" />
        <div className="section" />
      </main>
    </div>
  );
}

Login.propTypes = {
  auth: PropTypes.object,
  onSubmitForm: PropTypes.func,
  onChangeInput: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loginUser());
    },
    onChangeInput: (evt, input) => {
      dispatch(changeInput(input, evt.target.value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
