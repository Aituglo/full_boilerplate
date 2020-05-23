/*
 * Auth Messages
 *
 * This contains all the text for the Auth container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.auth';

export default defineMessages({
  hello_header: {
    id: `${scope}.hello_header`,
    defaultMessage: 'Hello',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Register',
  },
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: 'Welcome',
  },
});
