import {
  Autocomplete,
  Button,
  Combobox,
  Loader,
  TextInput,
  useCombobox,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
  fetchDeleteItem,
  fetchFindItems,
  fetchHoldItem,
} from './helpers/api/api';
import { Item } from './helpers/api/types';

type FindItemFieldProps = {
  triggerEffectRerun: () => void;
};

export const FindItemField = ({ triggerEffectRerun }: FindItemFieldProps) => {
  const [foundItems, setFoundItems] = useState<Item[]>([]);
  const [comboOptions, setComboOptions] = useState<React.ReactNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const [selectedItem, setSelectedItem] = useState<Item>();
  const debouncedFetch = useDebouncedCallback(fetchAutocompleteData, 500);

  function fetchAutocompleteData(query: any) {
    setLoading(true);

    const fetchItems = async () => {
      try {
        const response = await fetchFindItems(query);
        if (response && response.foundItems) {
          setFoundItems(response.foundItems);
          setLoading(false);
        }
      } catch (e) {
        setFoundItems([]);
      }
    };

    fetchItems();
  }

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    if (value.length > 1) {
      debouncedFetch(value);
    }
  }, [value, debouncedFetch]);

  useEffect(() => {
    const options = (foundItems || []).map(item => (
      <Combobox.Option value={item.itemName} key={item.itemName}>
        {item.itemName}
      </Combobox.Option>
    ));
    console.log(options);
    setComboOptions(options);
  }, [foundItems]);

  useEffect(() => {
    // we need to wait for options to render before we can select first one
    combobox.selectFirstOption();
    const searchIndex = foundItems.findIndex(item => item.itemName === value);
    if (searchIndex > -1) {
      setSelectedItem(foundItems[searchIndex]);
    }
  }, [value, comboOptions, foundItems]);

  const onSubmitHold = async () => {
    if (selectedItem) {
      try {
        // Replace with your actual API call for holding an item
        const response = await fetchHoldItem(selectedItem.itemName);
        triggerEffectRerun();
        console.log('Item held successfully:', response);
        // Handle success (e.g., show notification)
      } catch (error) {
        console.error('Error holding item:', error);
        // Handle error (e.g., show error message)
      }
    }
  };

  const onSubmitDelete = async () => {
    if (selectedItem) {
      try {
        // Replace with your actual API call for deleting an item
        const response = await fetchDeleteItem(selectedItem.itemName);
        triggerEffectRerun();
        console.log('Item deleted successfully:', response);
        // Handle success (e.g., show notification)
      } catch (error) {
        console.error('Error deleting item:', error);
        // Handle error (e.g., show error message)
      }
    }
  };

  const onSubmitMoveTo = async () => {
    // if (selectedItem) {
    //   try {
    //     // Replace with your actual API call for moving an item
    //     const response = await fetchMoveItem(selectedItem.itemName);
    //     console.log('Item moved successfully:', response);
    //     // Handle success (e.g., show notification)
    //   } catch (error) {
    //     console.error('Error moving item:', error);
    //     // Handle error (e.g., show error message)
    //   }
    // }
  };

  return (
    <div>
      <Combobox
        onOptionSubmit={optionValue => {
          setValue(optionValue);
          combobox.closeDropdown();
        }}
        store={combobox}
        withinPortal={false}
      >
        <Combobox.Target>
          <TextInput
            label='Find an Item'
            placeholder='Search'
            value={value}
            onChange={event => {
              setValue(event.currentTarget.value);
              combobox.openDropdown();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            rightSection={loading && <Loader size={18} />}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {comboOptions.length === 0 ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : (
              comboOptions
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <label htmlFor=''>
        {selectedItem
          ? `${selectedItem.itemName} is in Bin: ${selectedItem.location}`
          : value.length === 0
          ? 'Nothing found'
          : `${value} not found`}
      </label>
      <br></br>
      <Button
        style={{ margin: '5px' }}
        type='button'
        color='blue'
        onClick={onSubmitHold}
        disabled={!Boolean(selectedItem)}
      >
        Hold
      </Button>
      <Button
        style={{ margin: '5px' }}
        type='button'
        color='blue'
        onClick={onSubmitDelete}
        disabled={!Boolean(selectedItem)}
      >
        Delete
      </Button>
      {/* <Button style={{margin: '5px'}} type='button' color='blue' onClick={onSubmitMoveTo}>
        Move to
      </Button> TODO*/}
    </div>
  );
};
