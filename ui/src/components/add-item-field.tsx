import { Box, Button, NumberInput, Select, TextInput } from '@mantine/core';
import {
  Form,
  hasLength,
  isInRange,
  isNotEmpty,
  matches,
  useForm,
} from '@mantine/form';
import { Fragment, useState } from 'react';

export const AddItemField = () => {
  const form = useForm({
    initialValues: {
      itemName: '',
      itemBin: '',
    },

    validate: {
      itemName: value =>
        value.length < 3 || !/^[A-Za-z]+$/.test(value)
          ? 'Item name must contain at least 2 letters and consist only of letters'
          : null,
      itemBin: isInRange({ min: 1, max: 99 }, 'Bin number must exist'),
    },
  });

//   const [value, setValue] = useState('');

  return (
    <Fragment>
      <Box
        component='form'
        maw={400}
        mx='auto'
        onSubmit={form.onSubmit(() => {})}
      >
        <TextInput
          label='Item Name'
          placeholder='Item'
          {...form.getInputProps('itemName')}
        />

        <NumberInput {...form.getInputProps('itemBin')} />

        <Button type='submit'>Submit</Button>
      </Box>
    </Fragment>
  );
};
