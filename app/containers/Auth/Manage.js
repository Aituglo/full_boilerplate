/**
 *
 * Manage
 *
 */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from '@app/utils/injectSaga';
import { useInjectReducer } from '@app/utils/injectReducer';
import Container from '@app/components/Container';
import { manageUser, updateUser, changeInput } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import makeSelectAuth from './selectors';

export function Manage({
  auth,
  user,
  onChangeInput,
  onSubmitForm,
  updateUserFunc,
}) {
  useInjectReducer({ key: 'auth', reducer });
  useInjectSaga({ key: 'auth', saga });

  useEffect(() => {
    updateUserFunc(user);
  }, [0]);

  return (
    <div>
      <FormattedMessage {...messages.manage_header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Manage" />
          </Helmet>
        )}
      </FormattedMessage>
      <Container title={<FormattedMessage {...messages.manage_header} />}>
        {' '}
        <form onSubmit={onSubmitForm} id="manageForm">
          <div className="row">
            <FormattedMessage {...messages.email}>
              {message => (
                <input
                  type="email"
                  id="email"
                  className="input-field"
                  placeholder={message}
                  value={auth.email}
                  onChange={evt => onChangeInput(evt, 'email')}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="row">
            <FormattedMessage {...messages.username}>
              {message => (
                <input
                  type="text"
                  id="username"
                  className="input-field"
                  placeholder={message}
                  value={auth.username}
                  onChange={evt => onChangeInput(evt, 'username')}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="row">
            <FormattedMessage {...messages.firstname}>
              {message => (
                <input
                  type="text"
                  id="firstname"
                  className="input-field"
                  placeholder={message}
                  value={auth.firstname}
                  onChange={evt => onChangeInput(evt, 'firstname')}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="row">
            <FormattedMessage {...messages.lastname}>
              {message => (
                <input
                  type="text"
                  id="lastname"
                  className="input-field"
                  placeholder={message}
                  value={auth.lastname}
                  onChange={evt => onChangeInput(evt, 'lastname')}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="row">
            <select
              className="browser-default"
              id="language"
              value={auth.language}
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
          <div className="row">
            <FormattedMessage {...messages.password}>
              {message => (
                <input
                  type="password"
                  id="password"
                  className="input-field"
                  placeholder={message}
                  value={auth.password}
                  onChange={evt => onChangeInput(evt, 'password')}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="row">
            <FormattedMessage {...messages.verif_password}>
              {message => (
                <input
                  type="password"
                  id="verifPassword"
                  className="input-field"
                  placeholder={message}
                  value={auth.verifPassword}
                  onChange={evt => onChangeInput(evt, 'verifPassword')}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="row">
            <button className="btn blue btn-large" type="submit">
              <FormattedMessage id="app.global.submit" />
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

Manage.propTypes = {
  auth: PropTypes.object,
  onSubmitForm: PropTypes.func,
  onChangeInput: PropTypes.func,
  user: PropTypes.object,
  updateUserFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(manageUser());
    },
    updateUserFunc: user => {
      dispatch(updateUser(user));
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
)(Manage);
