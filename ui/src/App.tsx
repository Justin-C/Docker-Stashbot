import React from 'react';
import { MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { Button, TextInput, rem } from '@mantine/core';


import './App.css';
const marks = [
  { value: 20, label: '20%' },
  { value: 50, label: '50%' },
  { value: 80, label: '80%' },
];


function App() {
  const [value, setValue] = useState('');
  
  return (
    <MantineProvider>
    <div className="App">
      <h1>Docker Stashbot</h1>
      <Button>Submit</Button>
      <TextInput value={value} onChange={(event) => setValue(event.currentTarget.value)} />
            </div>
    </MantineProvider>
  );
}

export default App;
