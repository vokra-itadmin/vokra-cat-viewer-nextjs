import Title from "./Title";
import Subtitle from "./Subtitle";
import Details from "./Details";
import CatDesc from "./CatDesc";
import Attributes from "./Attributes";
import Header from "./Header";
import CatCarousel from "./CatCarousel";
import Button from "./Button";

export default function CatDetails({ cats, cat, setCatDetails, setDismiss }) {
  return (
    <div
      className="fixed inset-0 bg-white grid gap-2 lg:grid-cols-2 lg:py-4 z-20 overflow-y-scroll"
      style={{ backgroundColor: "rgb(245, 245, 245" }}
    >
      <CatCarousel cat={cat} />
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
        <Attributes cats={cats} cat={cat} setCatDetails={setCatDetails} />
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setDismiss(true);
            }}
          >
            Go Back
          </Button>
          <a href={`https://www.shelterluv.com/matchme/adopt/VOKR-A-${cat.ID}`}>
            <Button primary>Adopt {cat.Name}!</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
