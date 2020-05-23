/**
 *
 * Asynchronously loads the container
 *
 */

import loadable from '@app/utils/loadable';

const Login = loadable(() => import('./Login'));
const Register = loadable(() => import('./Register'));
const Manage = loadable(() => import('./Manage'));

export { Login, Register, Manage };
