import { Button } from '@mantine/core';
import { fetchAddBin } from './helpers/api/api';

export const BinView = () => {
  const onSubmit = async () => {
    try {
      await fetchAddBin();
    } catch (e) {}
  };
  return <Button onClick={onSubmit}>Add Bin</Button>;
};
