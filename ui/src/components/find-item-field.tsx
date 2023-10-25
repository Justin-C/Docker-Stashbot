import { Autocomplete, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const FindItemField = () => {

    const form = useForm();
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [autocompleteOptions, setAutocompleteOptions] = useState(['']);
    const debouncedFetch = useDebouncedCallback(fetchAutocompleteData, 500);
  
    useEffect(() => {
      debouncedFetch(autocompleteValue);
    }, [autocompleteValue, debouncedFetch]);
  
    const handleSubmit = (values: any) => {
      // Handle form submission
      console.log(values);
    };
  
    function fetchAutocompleteData(query: any) {
      // Implement your fetch logic here
      // For example, you can use the fetch API or an axios request
      // Update the options in the state based on the fetched data
      // For simplicity, using a mock function here
  
      const mockFetch = async () => {
        // const response = await fetch(`https://api.example.com/autocomplete?query=${query}`);
        // const data = await response.json();
        setAutocompleteOptions(['asdf', 'aa']);
      };
  
      mockFetch();
    }
  
    return (
      <form onSubmit={form.onSubmit(handleSubmit)}>
  
        <Autocomplete
          label="Find an Item"
          placeholder="Find an Item"
          data={autocompleteOptions}
          value={autocompleteValue}
          onChange={(value) => setAutocompleteValue(value)}
        //   textFieldProps={{ ...form.getInputProps('country') }}
        //   clearable
          required
        />
  
        <Button type="submit" color="blue" >
          Hold
        </Button>
        <Button type="submit" color="blue" >
          Delete
        </Button>
      </form>
    );
}