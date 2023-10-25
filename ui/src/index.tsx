import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import './App.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App';


const root = document.getElementById('root') as HTMLElement;
const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>
);