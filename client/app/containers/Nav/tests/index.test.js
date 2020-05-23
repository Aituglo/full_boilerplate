/**
 * Testing the NavPage
 */

import React from 'react';
import { mount } from 'enzyme';
import { browserHistory, BrowserRouter } from 'react-router-dom';
import configureStore from '@app/configureStore';
import { Provider } from 'react-redux';
import { LanguageProvider } from '@app/containers/LanguageProvider';
import { translationMessages } from '@app/i18n';
import { Nav } from '../index';

describe('<Nav />', () => {
  const store = configureStore({}, browserHistory);
  store.dispatch = jest.fn();
  const sockyx = {};
  const neurons = {
    neurons: [
      {
        routes: [],
      },
    ],
  };
  const nav = {
    nav: [],
  };
  const user = {};
  const logoutUserFunc = jest.fn();
  const getNavFunc = jest.fn();
  const removeNavFunc = jest.fn();
  const addNavFunc = jest.fn();
  const getNotificationsFunc = jest.fn();
  const onChangeNavColor = jest.fn();
  const onChangeNavIcon = jest.fn();
  const onChangeNavUrl = jest.fn();
  const onChangeManage = jest.fn();
  const onChangeButton = jest.fn();

  it('should render the Page Nav', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <BrowserRouter>
            <Nav
              sockyx={sockyx}
              neurons={neurons}
              nav={nav}
              user={user}
              logoutUserFunc={logoutUserFunc}
              getNavFunc={getNavFunc}
              removeNavFunc={removeNavFunc}
              getNotificationsFunc={getNotificationsFunc}
              addNavFunc={addNavFunc}
              onChangeManage={onChangeManage}
              onChangeNavColor={onChangeNavColor}
              onChangeNavIcon={onChangeNavIcon}
              onChangeNavUrl={onChangeNavUrl}
              onChangeButton={onChangeButton}
            />
          </BrowserRouter>
        </LanguageProvider>
      </Provider>,
    );
    expect(
      wrapper
        .find('div')
        .at(1)
        .hasClass('uk-visible@xl'),
    ).toBe(true);
  });
});
