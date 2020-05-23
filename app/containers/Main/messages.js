/*
 * Main Messages
 *
 * This contains all the text for the Main container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.main';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Home',
  },
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: 'Welcome',
  },
});
