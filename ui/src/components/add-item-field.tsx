import { Box, Button, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Fragment } from 'react';
import { fetchAddItem } from './helpers/api/api';
import { notifications } from '@mantine/notifications';

export const AddItemField = () => {
  const form = useForm({
    initialValues: {
      itemName: '',
      itemBin: '',
    },

    validate: {
      itemName: value =>
        value.length < 2 || /\s{2,}|^\s+|\s+$/.test(value)
        ? 'Item name must contain at least 2 characters and not have extra spaces'
          : null,
      itemBin: value => {
        const binNumber = Number(value);
        return isNaN(binNumber) || binNumber < 1 || binNumber > 99
          ? 'Bin number must be between 1 and 99'
          : null;
      },
    },
  });

  const onSubmit = async (values: { itemName: string; itemBin: string }) => {
    const { itemName, itemBin } = values;
    try {
      const resp = await fetchAddItem(itemName, itemBin.toString());
      notifications.show({
        title: 'Item Added Sucessfully',
        message: resp.response,
      });
    } catch (e: any) {
      console.error('Error adding item:', e);

      // Handle error response or default to a generic message
      const errorMessage = e.error ? e.error : 'Unknown error occurred';

      notifications.show({
        color: 'red',
        title: 'Error Adding Item',
        message: errorMessage,
      });
    }
  };

  return (
    <Fragment>
      <Box
        component='form'
        maw={400}
        mx='auto'
        onSubmit={form.onSubmit(onSubmit)}
      >
        <TextInput
          style={{ marginTop: '10px' }}
          label='Item Name'
          placeholder='Item'
          {...form.getInputProps('itemName')}
        />

        <NumberInput
          label='Item Bin'
          placeholder='Bin number'
          {...form.getInputProps('itemBin')}
          min={1}
          max={99}
        />

        <Button type='submit' style={{ marginTop: '10px' }}>
          Submit
        </Button>
      </Box>
    </Fragment>
  );
};
