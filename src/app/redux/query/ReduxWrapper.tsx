'use client';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'react-hot-toast';

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}> <Toaster />{children} </Provider>;
};

export default ReduxWrapper;
