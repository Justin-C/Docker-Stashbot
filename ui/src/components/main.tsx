import { Tabs } from '@mantine/core';
import { useState } from 'react';
import { FindItemField } from './find-item-field';
import { AddItemField } from './add-item-field';

export const Main = () => {
  const [activeTab, setActiveTab] = useState<string | null>('first');

  return (
    <Tabs
      variant='outline'
      defaultValue='gallery'
      value={activeTab}
      onChange={setActiveTab}
    >
      <Tabs.List justify={'center'}>
        <Tabs.Tab value='first'>Insert Item</Tabs.Tab>
        <Tabs.Tab value='second'>Find Item</Tabs.Tab>
        <Tabs.Tab value='third'>View Bin</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='first'>
        <AddItemField />
      </Tabs.Panel>
      <Tabs.Panel value='second'>
        <FindItemField />
      </Tabs.Panel>
      <Tabs.Panel value='third'>View Bin</Tabs.Panel>
    </Tabs>
  );
};
