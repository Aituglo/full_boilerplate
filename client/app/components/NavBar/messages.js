/*
 * Navbar Messages
 *
 * This contains all the text for the Navbar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.component.Navbar';

export default defineMessages({
  myaccount: {
    id: `${scope}.myaccount`,
    defaultMessage: 'My Account',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
});
