import Title from "./Title";
import Subtitle from "./Subtitle";
import CoverPhoto from "./CoverPhoto";
import CoverDesc from "./CoverDesc";
import CatDetails from "./CatDetails";
import Header from "./Header";
import { useState, useEffect } from "react";

export default function CatCard({
  cat,
  catDetails,
  setCatDetails,
  setDismiss,
  setCatsDisplay,
}) {
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        setCatDetails(cat.ID);
        setCatsDisplay("fixed z-20");
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
