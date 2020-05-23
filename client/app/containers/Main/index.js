/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable global-require */
/**
 *
 * Main
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import Container from '../../components/Container';

import messages from './messages';

export function Main({ user }) {
  return (
    <div>
      <FormattedMessage {...messages.header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Main" />
          </Helmet>
        )}
      </FormattedMessage>
      <Container title={<FormattedMessage {...messages.header} />}>
        <p className="center">
          <FormattedMessage {...messages.welcome} /> {user.username}
        </p>
      </Container>
    </div>
  );
}

Main.propTypes = {
  user: PropTypes.object,
};

export default memo(Main);
