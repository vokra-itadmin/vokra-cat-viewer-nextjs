import Select from "react-select";

export default function Searchbar({
  handleBreedChange,
  handleColorChange,
  handleAgeChange,
  handleSexChange,
  handleAttributeChange,
}) {
  const breeds = [
    { value: "Longhair", label: "Longhair" },
    { value: "Medium Hair", label: "Medium Hair" },
    { value: "Shorthair", label: "Shorthair" },
    { value: "Siamese", label: "Siamese" },
  ];

  const colors = [
    { value: "Calico", label: "Calico" },
    { value: "Black", label: "Black" },
    { value: "Brown", label: "Brown" },
    { value: "Grey", label: "Grey" },
    { value: "Tan", label: "Tan" },
    { value: "Tortoise", label: "Tortoise" },
    { value: "White", label: "White" },
  ];

  const ages = [
    { value: "Kitten (< 1 year)", label: "Kitten (< 1 year)" },
    { value: "Adult (1-8 years)", label: "Adult (1-8 years)" },
    { value: "Senior (8+ years)", label: "Senior (8+ years)" },
  ];

  const sexes = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const attributes = [
    { value: "OK with other cats", label: "OK with other cats" },
    { value: "OK with dogs", label: "OK with dogs" },
    { value: "OK with kids", label: "OK with kids" },
    { value: "OK with older kids only", label: "OK with older kids only" },
    { value: "OK as single", label: "OK as single" },
    { value: "Bonded", label: "Bonded" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2 fixed w-full bg-white z-10">
      <Select
        options={breeds}
        onChange={handleBreedChange}
        isClearable
        placeholder="Type"
      />
      <Select
        options={colors}
        onChange={handleColorChange}
        isClearable
        placeholder="Color"
      />
      <Select
        options={ages}
        onChange={handleAgeChange}
        isClearable
        placeholder="Age"
      />
      <Select
        options={sexes}
        onChange={handleSexChange}
        isClearable
        placeholder="Gender"
      />
      <Select
        className="col-span-2"
        options={attributes}
        onChange={handleAttributeChange}
        isClearable
        isMulti
      />
      <input
        className="border rounded px-2.5 py-1.5 col-span-2"
        placeholder="Name"
      ></input>
    </div>
  );
}
