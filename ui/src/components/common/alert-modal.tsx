import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
// not currently used
type AlertModalProps = {
  isOpen: boolean;
  onClose: Function;
};
const AlertModal = (props: AlertModalProps) => {
  return (
    <>
      <Modal opened={props.isOpen} onClose={props.onClose()} title='Alert'>
        kldsahjfk
      </Modal>
    </>
  );
};

export default AlertModal;
