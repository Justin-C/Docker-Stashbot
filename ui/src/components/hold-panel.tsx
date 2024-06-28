import React, { useState, useEffect } from 'react';
import { Button, Text } from '@mantine/core';
import { fetchGetHolds } from './helpers/api/api';
import { Item } from './helpers/api/types';

export const HoldPanel = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
        try {
          const data = await fetchGetHolds();
          setItems(data);
        } catch (error) {
          console.error('Error fetching hold items:', error);
          // Handle error as needed (e.g., set error state)
        }
      };
  
      fetchItems();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <h2>Items on Hold</h2>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <Text>{item.itemName} - {item.itemLocation}</Text>
          <Button>Click Me</Button>
        </div>
      ))}
    </div>
  );
};
