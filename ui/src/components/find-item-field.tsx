import { Autocomplete, Button, Combobox, Loader, TextInput, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchFindItems } from "./helpers/api/api";
import { Item } from "./helpers/api/types";

export const FindItemField = () => {
  const [foundItems, setFoundItems] = useState<Item[]>([]);
  const [comboOptions, setComboOptions] = useState<React.ReactNode[]>([])
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  
  const [selectedItem, setSelectedItem] = useState({
    itemName: "",
    itemLocation: "",
  });
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
    if(value.length > 1){
      debouncedFetch(value);
    }
  }, [value, debouncedFetch]);

  useEffect(() => {
    const options = (foundItems || []).map((item) => (
      <Combobox.Option value={item.itemName} key={item.itemName}>
        {item.itemName}
      </Combobox.Option>
    ));
    console.log(options)
    setComboOptions(options)
  }, [foundItems])

  useEffect(() => {
    // we need to wait for options to render before we can select first one
    combobox.selectFirstOption();
  }, [value, comboOptions]);

  return (
    <div>
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}
    >
      <Combobox.Target>
        <TextInput
          label="Pick value or type anything"
          placeholder="Pick value or type anything"
          value={value}
          onChange={(event) => {
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
          {comboOptions.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : comboOptions}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
      <label htmlFor="">
        {selectedItem.itemName} in bin {selectedItem.itemLocation}
      </label>
      <br></br>
      <Button type="submit" color="blue">
        Hold
      </Button>
      <Button type="submit" color="blue">
        Delete
      </Button>
      <Button type="submit" color="blue">
        Move to
      </Button>
    </div>
  );
}