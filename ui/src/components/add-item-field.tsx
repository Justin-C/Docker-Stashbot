import { Box, Button, NumberInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Fragment } from 'react';
import { fetchAddItem } from './helpers/api/api';

export const AddItemField = () => {
  const form = useForm({
    initialValues: {
      itemName: '',
      itemBin: '',
    },

    validate: {
      itemName: value =>
        value.length < 3 || !/^[A-Za-z]+$/.test(value)
          ? 'Item name must contain at least 3 letters and consist only of letters'
          : null,
      itemBin: value => {
        const binNumber = Number(value);
        return isNaN(binNumber) || binNumber < 1 || binNumber > 99
          ? 'Bin number must be between 1 and 99'
          : null;
      }
    },
  });

  const onSubmit = async (values: {itemName: string, itemBin: string}) => {
    const { itemName, itemBin } = values;
    await fetchAddItem(itemName, itemBin);
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

        <Button type='submit'>Submit</Button>
      </Box>
    </Fragment>
  );
};
