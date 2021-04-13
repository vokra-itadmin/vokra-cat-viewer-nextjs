import Cat from "../components/Cat";

export default function Cats({
  cats,
  breeds,
  colors,
  ages,
  sexes,
  attributes,
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
    console.log("attributes: ", attributesParam);
    return attributesParam
      .map((attribute) => attribute.AttributeName)
      .some((attribute) => attributes.includes(attribute));
  };
  return (
    <div>
      {cats
        .filter((cat) => cat.Breed === "Domestic " + breeds || breeds === "Any")
        .filter((cat) => cat.Color === colors || colors === "Any")
        .filter((cat) => convertAge(cat.Age) === ages || ages === "Any")
        .filter((cat) => cat.Sex === sexes || sexes === "Any")
        .filter(
          (cat) => compareAttributes(cat.Attributes) || attributes === "Any"
        )
        .map((cat) => (
          <Cat cat={cat} key={cat.ID} />
        ))}
    </div>
  );
}
