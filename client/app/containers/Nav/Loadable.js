/**
 *
 * Asynchronously loads the component for Nav
 *
 */

import loadable from '@app/utils/loadable';

export default loadable(() => import('./index'));
