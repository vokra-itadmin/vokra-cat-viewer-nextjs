import { useEffect } from "react";
import CatCard from "../components/CatCard";

export default function Cats({
  cats,
  breeds,
  colors,
  ages,
  sexes,
  attributes,
  name,
}) {
  const convertAge = (age) => {
    if (age < 12) {
      return "Kitten (< 1 year)";
    } else if (age < 96) {
      return "Adult (1-8 years)";
    } else {
      return "Senior (8+ years)";
    }
  };
  const compareAttributes = (attributesParam) => {
    return attributes.every((attribute) =>
      attributesParam
        .filter((i) => i.Publish === "Yes")
        .map((i) => i.AttributeName)
        .includes(attribute.value)
    );
  };
  return (
    <div className="grid md:grid-cols-2 md:p-2 gap-2 absolute top-48 md:top-24 ">
      {cats
        .filter(
          (cat) =>
            breeds === null ||
            cat.Breed === (breeds !== null ? "Domestic " + breeds.value : "")
        )
        .filter(
          (cat) =>
            colors === null ||
            cat.Color === (colors !== null ? colors.value : "")
        )
        .filter(
          (cat) =>
            ages === null ||
            convertAge(cat.Age) === (ages !== null ? ages.value : "")
        )
        .filter(
          (cat) =>
            sexes === null || cat.Sex === (sexes !== null ? sexes.value : "")
        )
        .filter(
          (cat) =>
            attributes.length === 0 ||
            (attributes !== null ? compareAttributes(cat.Attributes) : [])
        )
        .filter((cat) =>
          cat.Name.toLowerCase().includes(name.target.value.toLowerCase())
        )
        .map((cat) => (
          <CatCard cat={cat} key={cat.ID} />
        ))}
    </div>
  );
}
