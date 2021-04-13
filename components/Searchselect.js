import { useState } from "react";
import Select from "react-select";

export default function Searchselect({ options, handleChange }) {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <Select
      defaultValue={selectedOption}
      onChange={handleChange}
      options={options}
    />
  );
}
