import Title from "./Title";
import Subtitle from "./Subtitle";
import CoverPhoto from "./CoverPhoto";
import CoverDesc from "./CoverDesc";
import Header from "./Header";

export default function CatCard({ cat, setCatDetails, setCatsDisplay }) {
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
    </div>
  );
}
