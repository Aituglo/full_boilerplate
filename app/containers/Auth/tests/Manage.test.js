import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { browserHistory } from 'react-router-dom';
import { LanguageProvider } from '@app/containers/LanguageProvider';
import { translationMessages } from '@app/i18n';
import configureStore from '@app/configureStore';

import { changeInput, manageUser } from '../actions';

import Manage from '../Manage';

describe('<Manage />', () => {
  let store;

  beforeEach(() => {
    store = configureStore({}, browserHistory);

    store.dispatch = jest.fn();
  });

  it('should not call onSubmitForm if email or password is an empty string', () => {
    const submitSpy = jest.fn();
    renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Manage />
        </LanguageProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should call onChangeInput if email is changed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Manage />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root
        .findByProps({ id: 'email' })
        .props.onChange({ target: { value: 'test@test.fr' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('email', 'test@test.fr'),
    );
  });

  it('should call onChangeInput if password is changed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Manage />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root
        .findByProps({ id: 'password' })
        .props.onChange({ target: { value: 'password' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('password', 'password'),
    );
  });

  it('should call onChangeInput if verifPassword is changed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Manage />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root
        .findByProps({ id: 'verifPassword' })
        .props.onChange({ target: { value: 'password' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('verifPassword', 'password'),
    );
  });

  it('should call onChangeInput if username is changed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Manage />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root
        .findByProps({ id: 'username' })
        .props.onChange({ target: { value: 'Aituglo' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('username', 'Aituglo'),
    );
  });

  it('should call onChangeInput if firstname is changed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Manage />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root
        .findByProps({ id: 'firstname' })
        .props.onChange({ target: { value: 'firstname' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('firstname', 'firstname'),
    );
  });

  it('should call onChangeInput if lastname is changed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Manage />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root
        .findByProps({ id: 'lastname' })
        .props.onChange({ target: { value: 'lastname' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('lastname', 'lastname'),
    );
  });

  it('should call onChangeInput if language is changed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Manage />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root
        .findByProps({ id: 'language' })
        .props.onChange({ target: { value: 'language' } });
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      changeInput('language', 'language'),
    );
  });

  it('should call onSubmit if button is pressed', () => {
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Manage />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root.findByProps({ id: 'manageForm' }).props.onSubmit();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(manageUser());
  });

  it('should call preventDefault onSubmit if button is pressed', () => {
    const evt = {
      preventDefault: jest.fn(),
    };
    const container = renderer.create(
      <Provider store={store}>
        <LanguageProvider messages={translationMessages}>
          <Manage />
        </LanguageProvider>
      </Provider>,
    );

    renderer.act(() => {
      container.root.findByProps({ id: 'manageForm' }).props.onSubmit(evt);
    });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(manageUser());
  });
});
