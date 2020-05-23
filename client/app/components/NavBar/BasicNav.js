/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * BasicNav
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Navbar, NavItem, Icon } from 'react-materialize';

import { FormattedMessage } from 'react-intl';

import messages from './messages';

export function BasicNav({ logoutUserFunc, history }) {
  return (
    <div>
      <Navbar
        alignLinks="left"
        className="darken-1 blue"
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: 'left',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}
      >
        <NavItem onClick={() => history.push('/')}>
          <FormattedMessage {...messages.home} />
        </NavItem>
        <NavItem onClick={() => history.push('/user/manage')}>
          <FormattedMessage {...messages.myaccount} />
        </NavItem>
        <NavItem onClick={() => logoutUserFunc()}>
          <FormattedMessage {...messages.logout} />
        </NavItem>
      </Navbar>
    </div>
  );
}

BasicNav.propTypes = {
  logoutUserFunc: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default memo(withRouter(BasicNav));
