import Searchbar from "./Searchbar";
import Cats from "../components/Cats";
import { useEffect, useState } from "react";
export default function Layout({ cats }) {
  const [breeds, setBreeds] = useState(null);
  const [colors, setColors] = useState(null);
  const [ages, setAges] = useState(null);
  const [sexes, setSexes] = useState(null);
  const [attributes, setAttributes] = useState(null);
  const handleBreedChange = (e) => {
    setBreeds(e);
  };
  const handleColorChange = (e) => {
    setColors(e);
  };
  const handleAgeChange = (e) => {
    setAges(e);
  };
  const handleSexChange = (e) => {
    setSexes(e);
  };
  const handleAttributeChange = (e) => {
    setAttributes(e);
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
