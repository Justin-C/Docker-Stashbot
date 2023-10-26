import { Autocomplete, Button, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { fetchFindItems } from "./helpers/api/api";

export const FindItemField = () => {
  // const form = useForm();
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [autocompleteOptions, setAutocompleteOptions] = useState([""]);
  const [foundItems, setFoundItems] = useState([
    { itemName: "", itemLocation: "" },
  ]);
  const [selectedItem, setSelectedItem] = useState({
    itemName: "",
    itemLocation: "",
  });
  const debouncedFetch = useDebouncedCallback(fetchAutocompleteData, 500);

  useEffect(() => {
    if(autocompleteValue.length > 1){
      debouncedFetch(autocompleteValue);
    }
  }, [autocompleteValue, debouncedFetch]);

  useEffect(() => {
    const search = foundItems.find(
      (item) => item?.itemName === autocompleteValue,
    );
    if (search) {
      setSelectedItem(search);
    }
  }, [foundItems, autocompleteValue]);

  // const handleSubmit = (values: any) => {
  //   // Handle form submission
  //   console.log(values);
  // };

  function fetchAutocompleteData(query: any) {
    const fetchItems = async () => {
      const response = await fetchFindItems(query);
      if (response && response.foundItems) {
        const itemNames = response.foundItems.map((item: any) => item.itemName);
        setFoundItems(response.foundItems);
        setAutocompleteOptions(itemNames);
      }
    };

    fetchItems();
  }

  return (
    <div>
      <Autocomplete
        label="Find an Item"
        placeholder="Find an Item"
        // data={autocompleteOptions}
        value={autocompleteValue}
        onChange={(value) => setAutocompleteValue(value)}
        required
      />
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