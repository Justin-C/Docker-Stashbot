import { Button, Loader, Modal, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { fetchAddItem } from './helpers/api/api';
import AlertModal from './common/alert-modal';
import { useDisclosure } from '@mantine/hooks';

export const AddItemField = () => {
  const form = useForm();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [isOpen, { open, close }] = useDisclosure(false);
  const [modalText, setModalText] = useState('');
  const [bin, setBin] = useState('1');

  const submitItem = async () => {
    setLoading(true);

    const fetchItems = async () => {
      try {
        const response = await fetchAddItem(value, '1');
        console.log(response.ok);
        setLoading(false);
        if (response.error) {
          setModalText(response.error);
        } else {
          setModalText(`${value} added to bin ${bin}`);
        }

        open();
      } catch (err) {
        // TODO
        console.log(err);
      }
    };

    fetchItems();
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
      <Modal opened={isOpen} onClose={close} title='Alert'>
        {modalText}
      </Modal>
      {/* todo color change */}
    </form>
  );
};
