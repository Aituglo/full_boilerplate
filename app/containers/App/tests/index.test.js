import React from 'react';
import { mount } from 'enzyme';

import { Provider } from 'react-redux';
import { LanguageProvider } from '@app/containers/LanguageProvider';
import { translationMessages } from '@app/i18n';
import { ConnectedRouter } from 'connected-react-router';

import configureStore from '@app/configureStore';
import history from '@app/utils/history';

import App from '../index';

describe('<App />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({}, history);

    store.dispatch = jest.fn();
  });

  it('should render App', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </Provider>,
    );

    expect(wrapper.exists('div')).toBe(true);
  });
});
