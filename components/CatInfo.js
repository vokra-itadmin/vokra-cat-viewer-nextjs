import Link from "next/link";
import Title from "./Title";
import Subtitle from "./Subtitle";
import Details from "./Details";
import CatDesc from "./CatDesc";
import Attributes from "./Attributes";
import CatHeader from "./CatHeader";
import Button from "./Button";

export default function CatInfo({ cats, cat }) {
  return (
    <div className="m-4 grid gap-4 content-start">
      <CatHeader>
        <Title>{cat.Name}</Title>
        <Subtitle>
          {cat.Sex}
          {", "}
          {cat.Age < 12
            ? `${cat.Age} months old`
            : `${Math.floor(cat.Age / 12)} years old`}
        </Subtitle>
        <Details>
          {cat.Breed} {cat.Color} {cat.Pattern === "None" ? "" : cat.Pattern}
        </Details>
      </CatHeader>
      <Attributes cats={cats} cat={cat} />
      <CatDesc>{cat.Description}</CatDesc>
      <div className="flex justify-center">
        <Link href="https://www.vokra.ca/adopt-a-cat">
          <a target="_top">
            <Button>Go Back</Button>
          </a>
        </Link>
        {cat.Adopted ? (
          ""
        ) : (
          <Link
            href={`https://new.shelterluv.com/matchme/adopt/VOKR-A-${cat.ID}`}
          >
            <a target="_top">
              <Button primary>Adopt {cat.Name}!</Button>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
