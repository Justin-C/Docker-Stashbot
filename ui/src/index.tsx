import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import './App.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <MantineProvider>
    <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);