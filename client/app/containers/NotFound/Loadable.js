/**
 *
 * Asynchronously loads the container
 *
 */

import loadable from '@app/utils/loadable';

export default loadable(() => import('./index'));
