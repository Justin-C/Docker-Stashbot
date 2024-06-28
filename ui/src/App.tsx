import { useState } from 'react';
import { AppShell, Burger, Button, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Main } from './components/main';

function App() {
  return (
    <AppShell>
      <AppShell.Main>
        <Main />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
