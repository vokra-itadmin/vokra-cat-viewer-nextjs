import Image from "next/image";

import Ribbon from "./Ribbon";

export default function CoverPhoto({ src, cat }) {
  return (
    <div className="relative">
      {cat.Attributes.map((attribute) => attribute.AttributeName).includes(
        "Special Adoption"
      ) ? (
        <Ribbon color="bg-vokra-light">I'm Extra Special!</Ribbon>
      ) : (
        ""
      )}
      <Image
        layout="responsive"
        width={1000}
        height={1000}
        src={src}
        alt={`${cat.Name}, a ${cat.Breed} ${cat.Color ? cat.Color + " " : ""}${
          cat.Pattern ? cat.Pattern + " " : ""
        }cat`}
      />
    </div>
  );
}
