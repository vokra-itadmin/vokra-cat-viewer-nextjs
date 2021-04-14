import Searchbar from "./Searchbar";
import Cats from "../components/Cats";
import { useState } from "react";
export default function Layout({ cats }) {
  const [breeds, setBreeds] = useState(null);
  const [colors, setColors] = useState(null);
  const [ages, setAges] = useState(null);
  const [sexes, setSexes] = useState(null);
  const [attributes, setAttributes] = useState([]);
  return (
    <div>
      <Searchbar
        handleBreedChange={setBreeds}
        handleColorChange={setColors}
        handleAgeChange={setAges}
        handleSexChange={setSexes}
        handleAttributeChange={setAttributes}
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
