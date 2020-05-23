/**
 *
 * NotFound
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import '@app/assets/css/404.css';

import messages from './messages';

export default function NotFound() {
  return (
    <main>
      <h1>
        4
        <span>
          <i className="fas fa-ghost" />
        </span>
        4
      </h1>
      <h2>
        <FormattedMessage {...messages.not_found_message} />
      </h2>
      <a href="/" className="btn btn-large blue">
        <FormattedMessage {...messages.home} />
      </a>
    </main>
  );
}
