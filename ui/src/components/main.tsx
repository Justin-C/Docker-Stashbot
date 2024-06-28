import { Tabs } from '@mantine/core';
import { Fragment, useState } from 'react';
import { FindItemField } from './find-item-field';
import { AddItemField } from './add-item-field';
import { HoldPanel } from './hold-panel';
import { BinView } from './bin-view';

export const Main = () => {
  const [activeTab, setActiveTab] = useState<string | null>('first');
  const [dependencyKey, setDependencyKey] = useState(0);
  const triggerEffectRerun = () => {
    setDependencyKey(prevKey => prevKey + 1); // Use functional update for dependencyKey
  };

  return (
    <div style={{ margin: '30px' }}>
      <Tabs
        variant='default'
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
          <FindItemField triggerEffectRerun={triggerEffectRerun} />
        </Tabs.Panel>
        <Tabs.Panel value='third'>
          <BinView />
        </Tabs.Panel>
      </Tabs>
      <HoldPanel dependencyKey={dependencyKey} />
    </div>
  );
};
