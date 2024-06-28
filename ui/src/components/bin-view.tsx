import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { fetchAddBin } from './helpers/api/api';

export const BinView = () => {
  const onSubmit = async () => {
    try {
      const response = await fetchAddBin();
      notifications.show({
        title: 'Bin Added',
        message: response.response,
      });
    } catch (e: any) {
      // Handle error response or default to a generic message
      const errorMessage = e.error ? e.error : 'Unknown error occurred';

      notifications.show({
        color: 'red',
        title: 'Error Adding Bin',
        message: errorMessage,
      });
    }
  };
  return <Button onClick={onSubmit}>Add Bin</Button>;
};
