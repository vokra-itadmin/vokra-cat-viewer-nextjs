import { useState, useEffect } from "react";
import CatCard from "../components/CatCard";
import CatDetails from "./CatDetails";

export default function Cats({
  cats,
  breeds,
  colors,
  ages,
  sexes,
  attributes,
  name,
}) {
  const [catDetails, setCatDetails] = useState("");
  const [dismiss, setDismiss] = useState(false);
  const [catsDisplay, setCatsDisplay] = useState("relative");
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
  useEffect(() => {
    if (dismiss) {
      setCatDetails("");
      setDismiss(false);
      setCatsDisplay("relative");
    }
  }),
    [dismiss];
  return (
    <div
      className={`grid md:grid-cols-2 md:p-2 gap-2 top-44 md:top-24 ${catsDisplay}`}
      style={{ backgroundColor: "rgb(245, 245, 245" }}
    >
      {catDetails ? (
        <CatDetails
          cat={cats.find((cat) => cat.ID === catDetails)}
          setDismiss={setDismiss}
        />
      ) : (
        ""
      )}
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
          <CatCard
            cat={cat}
            key={cat.ID}
            setCatDetails={setCatDetails}
            setDismiss={setDismiss}
            setCatsDisplay={setCatsDisplay}
          />
        ))}
    </div>
  );
}
