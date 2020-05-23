/**
 *
 * Nav
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import UserNav from '@app/components/NavBar/UserNav';
import BasicNav from '@app/components/NavBar/BasicNav';

export function Nav({ user, logoutUserFunc }) {
  return (
    <div>
      <UserNav logoutUserFunc={logoutUserFunc} user={user} />
      <BasicNav logoutUserFunc={logoutUserFunc} user={user} />
    </div>
  );
}

Nav.propTypes = {
  user: PropTypes.object,
  logoutUserFunc: PropTypes.func,
};

export default memo(Nav);
