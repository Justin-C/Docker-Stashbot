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
import { fetchFindItems } from './helpers/api/api';
import { Item } from './helpers/api/types';

export const FindItemField = () => {
  const [foundItems, setFoundItems] = useState<Item[]>([]);
  const [comboOptions, setComboOptions] = useState<React.ReactNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');

  const [selectedItem, setSelectedItem] = useState<Item>();
  const debouncedFetch = useDebouncedCallback(fetchAutocompleteData, 500);

  function fetchAutocompleteData(query: any) {
    setLoading(true);

    const fetchItems = async () => {
      const response = await fetchFindItems(query);
      if (response && response.foundItems) {
        setFoundItems(response.foundItems);
        setLoading(false);
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
          ? `${selectedItem.itemName} is in Bin: ${selectedItem.itemLocation}`
          : value.length === 0
          ? 'Nothing found'
          : `${value} not found`}
      </label>
      <br></br>
      <Button type='submit' color='blue'>
        Hold
      </Button>
      <Button type='submit' color='blue'>
        Delete
      </Button>
      <Button type='submit' color='blue'>
        Move to
      </Button>
    </div>
  );
};
