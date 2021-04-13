import Searchbar from "./Searchbar";
import Cats from "../components/Cats";
import { useEffect, useState } from "react";
export default function Layout({ cats }) {
  const [breeds, setBreeds] = useState("Any");
  const [colors, setColors] = useState("Any");
  const [ages, setAges] = useState("Any");
  const [sexes, setSexes] = useState("Any");
  const [attributes, setAttributes] = useState("Any");
  const handleBreedChange = (e) => {
    setBreeds(e.value);
  };
  const handleColorChange = (e) => {
    setColors(e.value);
  };
  const handleAgeChange = (e) => {
    setAges(e.value);
  };
  const handleSexChange = (e) => {
    setSexes(e.value);
  };
  const handleAttributeChange = (e) => {
    setAttributes(e.value);
  };

  return (
    <div>
      <Searchbar
        handleBreedChange={handleBreedChange}
        handleColorChange={handleColorChange}
        handleAgeChange={handleAgeChange}
        handleSexChange={handleSexChange}
        handleAttributeChange={handleAttributeChange}
      />
      <Cats
        cats={cats}
        breeds={breeds}
        colors={colors}
        ages={ages}
        sexes={sexes}
        attributes={attributes}
      />
    </div>
  );
}
