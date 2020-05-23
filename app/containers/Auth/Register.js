/**
 *
 * Register
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { compose } from 'redux';

import '@app/assets/css/auth.css';

import { useInjectSaga } from '@app/utils/injectSaga';
import { useInjectReducer } from '@app/utils/injectReducer';
import makeSelectAuth from './selectors';
import { registerUser, changeInput } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function Register({ auth, onChangeInput, onSubmitForm }) {
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

  return (
    <div>
      <FormattedMessage {...messages.register_header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Register" />
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

              <form onSubmit={onSubmitForm} id="registerForm">
                <div className="row">
                  <div className="input-field col s12 l6">
                    <input
                      type="email"
                      id="email"
                      className="validate"
                      value={auth.email}
                      required
                      onChange={evt => onChangeInput(evt, 'email')}
                    />

                    <label htmlFor="email">
                      <FormattedMessage {...messages.email} />
                    </label>
                  </div>

                  <div className="input-field col s12 l6">
                    <input
                      className="validate"
                      type="text"
                      id="username"
                      value={auth.username}
                      required
                      onChange={evt => onChangeInput(evt, 'username')}
                    />

                    <label htmlFor="username">
                      <FormattedMessage {...messages.username} />
                    </label>
                  </div>

                  <div className="input-field col s12 l6">
                    <input
                      type="text"
                      id="firstname"
                      className="validate"
                      value={auth.firstname}
                      required
                      onChange={evt => onChangeInput(evt, 'firstname')}
                    />

                    <label htmlFor="firstname">
                      <FormattedMessage {...messages.firstname} />
                    </label>
                  </div>

                  <div className="input-field col s12 l6">
                    <input
                      type="text"
                      id="lastname"
                      className="validate"
                      value={auth.lastname}
                      onChange={evt => onChangeInput(evt, 'lastname')}
                    />

                    <label htmlFor="lastname">
                      <FormattedMessage {...messages.lastname} />
                    </label>
                  </div>

                  <div className="input-field col s12 l6">
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

                  <div className="input-field col s12 l6">
                    <input
                      type="password"
                      id="verifPassword"
                      className="validate"
                      value={auth.verifPassword}
                      onChange={evt => onChangeInput(evt, 'verifPassword')}
                    />

                    <label htmlFor="verifPassword">
                      <FormattedMessage {...messages.verif_password} />
                    </label>
                  </div>

                  <div className="input-field col s12">
                    <select
                      className="browser-default"
                      id="language"
                      value={auth.language}
                      required
                      onChange={evt => onChangeInput(evt, 'language')}
                    >
                      <FormattedMessage {...messages.language}>
                        {message => <option default>{message}</option>}
                      </FormattedMessage>
                      <FormattedMessage {...messages.french}>
                        {message => <option value="fr-FR">{message}</option>}
                      </FormattedMessage>
                      <FormattedMessage {...messages.english}>
                        {message => <option value="en-US">{message}</option>}
                      </FormattedMessage>
                    </select>
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
          <Link to="/login">
            <FormattedMessage {...messages.login} />
          </Link>
        </center>

        <div className="section" />
        <div className="section" />
      </main>
    </div>
  );
}

Register.propTypes = {
  auth: PropTypes.object,
  isRegistered: PropTypes.bool,
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
      dispatch(registerUser());
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
)(Register);
