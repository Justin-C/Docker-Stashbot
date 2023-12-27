import { Button, Loader, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';

export const AddItemField = () => {
  const form = useForm();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const submitItem = () => {
    console.log('asdf');
  };
  return (
    <form onSubmit={form.onSubmit(submitItem)}>
      <div>
        <TextInput
          label='Find an Item'
          placeholder='Search'
          value={value}
          onChange={event => {
            setValue(event.currentTarget.value);
          }}
          rightSection={loading && <Loader size={18} />}
        />

        <Button type='submit' color='blue'>
          Move to
        </Button>
      </div>
    </form>
  );
};
