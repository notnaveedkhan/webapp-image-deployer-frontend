import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = extendTheme({
  fonts: {
    body: "Overpass, sans-serif"
  }
})

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
           <App />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);


reportWebVitals();
