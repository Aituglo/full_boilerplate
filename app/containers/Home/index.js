/**
 *
 * Home
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import '@app/assets/css/auth.css';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import messages from './messages';

export function Home() {
  return (
    <div>
      <FormattedMessage {...messages.hello_header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Hello" />
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
              <center>
                <h2>
                  <FormattedMessage {...messages.welcome} />
                </h2>
                <div className="row">
                  <Link
                    to="/register"
                    className="col s12 btn btn-large waves-effect indigo"
                  >
                    <FormattedMessage {...messages.register} />
                  </Link>
                </div>

                <div className="row">
                  <Link
                    to="/login"
                    className="col s12 btn btn-large waves-effect indigo"
                  >
                    <FormattedMessage {...messages.login} />
                  </Link>
                </div>
              </center>
            </div>
          </div>
        </center>

        <div className="section" />
        <div className="section" />
      </main>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
