import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import CoverPhoto from "../components/CoverPhoto";
import CoverDesc from "../components/CoverDesc";

export default function Cat({ cat }) {
  return (
    <div
      onClick={() => {
        console.log("This worked");
      }}
    >
      <Title>{cat.Name}</Title>
      <Subtitle>
        {cat.Breed} {cat.Color} {cat.Pattern}
      </Subtitle>
      <CoverPhoto src={cat.CoverPhoto} />
      <CoverDesc>{cat.Description}</CoverDesc>
    </div>
  );
}
