import React, { useState, useEffect } from 'react';
import { Button, Paper, Text } from '@mantine/core';
import { fetchGetHolds, fetchRemoveHold } from './helpers/api/api';
import { Item } from './helpers/api/types';

interface HoldPanelProps {
  dependencyKey: number; // Define the type for dependencyKey prop
}

export const HoldPanel = ({ dependencyKey }: HoldPanelProps) => {
  const [items, setItems] = useState<Item[]>([]);

  const onSubmit = async (itemName: string) => {
    try {
      const response = await fetchRemoveHold(itemName);
      console.log('Item submitted successfully:', response);

      // Refetch items on success
      refreshHoldItems(); // Call the fetchItems function directly

      // Handle success (e.g., update state, show notification)
    } catch (error) {
      console.error('Error submitting item:', error);
      // Handle error as needed (e.g., show error message)
    }
  };

  const refreshHoldItems = async () => {
    try {
      const data = await fetchGetHolds();
      setItems(data);
    } catch (error) {
      console.error('Error fetching hold items:', error);
      // Handle error as needed (e.g., set error state)
    }
  };

  useEffect(() => {
    refreshHoldItems();
  }, [dependencyKey]); // Runs initially and whenever dependencyKey changes

  return (
    <div>
      <Text size='lg'>Items on Hold</Text>
      {items.map((item, index) => (
        <Paper
          key={index}
          shadow='xs'
          p='xs'
          style={{
            minWidth: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <Text size='lg'>{item.itemName}</Text>
            <Text size='sm'>Taken from Bin {item.location}</Text>
          </div>
          <Button
            size='compact-sm'
            onClick={() => onSubmit(item.itemName)}
            style={{ marginTop: '10px', minWidth: '90px', margin: '10px' }}
          >
            Add Back
          </Button>
        </Paper>
      ))}
    </div>
  );
};
