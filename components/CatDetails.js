import Title from "./Title";
import Subtitle from "./Subtitle";
import Details from "./Details";
import CatDesc from "./CatDesc";
import Attributes from "./Attributes";
import Header from "./Header";
import CatPictures from "./CatPictures";
import Button from "./Button";

export default function CatDetails({ cat, setDismiss }) {
  return (
    <div className="fixed inset-0 bg-white grid gap-2 lg:grid-cols-2 lg:py-4">
      <CatPictures src={cat.CoverPhoto} />
      <div>
        <Header>
          <Title>{cat.Name}</Title>
          <Subtitle>
            {cat.Sex}
            {", "}
            {cat.Age < 12
              ? cat.Age + " months old"
              : Math.floor(cat.Age / 12) + " years old"}
          </Subtitle>
          <Details>
            {cat.Breed} {cat.Color} {cat.Pattern}
          </Details>
        </Header>
        <CatDesc>{cat.Description}</CatDesc>
        <Attributes attributes={cat.Attributes} />
        <Button
          onClick={() => {
            setDismiss(true);
          }}
        >
          Go Back
        </Button>
        <Button>Adopt {cat.Name}!</Button>
      </div>
    </div>
  );
}
