import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import './App.css';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import App from './App';
import { Notifications } from '@mantine/notifications';

const root = document.getElementById('root') as HTMLElement;
const rootElement = createRoot(root);

rootElement.render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications />
      <App />
    </MantineProvider>
  </React.StrictMode>,
);
