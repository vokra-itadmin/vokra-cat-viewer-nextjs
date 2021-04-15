import Title from "./Title";
import Subtitle from "./Subtitle";
import CoverPhoto from "./CoverPhoto";
import CoverDesc from "./CoverDesc";
import CatDetails from "./CatDetails";
import Header from "./Header";
import { useState, useEffect } from "react";

export default function CatCard({ cat }) {
  const [catDetails, setCatDetails] = useState("");
  const [dismiss, setDismiss] = useState(false);
  useEffect(() => {
    if (dismiss) {
      setCatDetails("");
      setDismiss(false);
    }
  }),
    [dismiss];
  return (
    <div
      onClick={() => {
        setCatDetails(<CatDetails cat={cat} setDismiss={setDismiss} />);
      }}
    >
      <Header>
        <Title>{cat.Name}</Title>
        <Subtitle>
          {cat.Breed} {cat.Color} {cat.Pattern}
        </Subtitle>
      </Header>
      <CoverPhoto src={cat.CoverPhoto} />
      <CoverDesc>{cat.Description}</CoverDesc>
      {catDetails}
    </div>
  );
}
