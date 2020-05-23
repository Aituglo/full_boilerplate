/*
 * Error Messages
 *
 * This contains all the text for the Auth container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.error';

export default defineMessages({
  not_found_message: {
    id: `${scope}.not_found_message`,
    defaultMessage: 'Error 404: Page not found',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
});
