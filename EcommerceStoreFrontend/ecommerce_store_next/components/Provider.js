'use client'
import React, { Children } from 'react';
import { Provider } from 'react-redux';

const ProviderWrapper = ({children}) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default ProviderWrapper

