import { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import CatCard from "./CatCard";

export default function Cats({
  cats,
  breeds,
  colors,
  ages,
  sexes,
  attributes,
  name,
}) {
  const router = useRouter();
  const convertAge = (age) => {
    if (age < 12) {
      return "Kitten (< 1 year)";
    }
    if (age < 96) {
      return "Adult (1-8 years)";
    }
    return "Senior (8+ years)";
  };
  const compareAttributes = (attributesParam) =>
    attributes.every((attribute) =>
      attributesParam
        .filter((i) => i.Publish === "Yes")
        .map((i) => i.AttributeName)
        .includes(attribute.value)
    );
  return (
    <div
      className={`grid md:grid-cols-2 md:top-36 top-52 md:p-4 gap-6 overflow-y-scroll h-main relative bg-vokra-gray`}
    >
      {cats
        .filter(
          (cat) =>
            breeds === null || cat.Breed === (`Domestic ${breeds.value}` || "")
        )
        .filter((cat) => colors === null || cat.Color.includes(colors.value))
        .filter(
          (cat) => ages === null || convertAge(cat.Age) === (ages.value || "")
        )
        .filter((cat) => sexes === null || cat.Sex === (sexes.value || ""))
        .filter(
          (cat) =>
            attributes.length === 0 ||
            (attributes !== null ? compareAttributes(cat.Attributes) : [])
        )
        .filter((cat) =>
          cat.Name.toLowerCase().includes(name.target.value.toLowerCase())
        )
        .map((cat) => (
          <Link
            key={cat["Internal-ID"]}
            href={`https://www.vokra.ca/testing?cat=${cat["Internal-ID"]}`}
            target="_top"
          >
            <a>
              <CatCard cat={cat} key={cat["Internal-ID"]} />
            </a>
          </Link>
        ))}
    </div>
  );
}
