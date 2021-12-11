import Link from "next/link";

export default function Attribute({
  attribute,
  cat,
  cats,
  catBondedID,
  extraClassName,
}) {
  return (
    <li
      key={attribute["Internal-ID"]}
      className={`text-sm rounded-sm m-0.5 px-2 py-1 mt-2 ${extraClassName}`}
    >
      {attribute.AttributeName === "Bonded"
        ? "Bonded to "
        : attribute.AttributeName}
      <span className="space-x-1">
        {cats
          .filter(
            (i) =>
              catBondedID(i).some((j) => j === cat["Internal-ID"]) &&
              attribute.AttributeName === "Bonded"
          )
          .map((i) => (
            <Link
              href={`https://www.vokra.ca/testing?cat=${i["Internal-ID"]}`}
              key={i["Internal-ID"]}
            >
              <a>
                {" "}
                <span className="underline">{i.Name}</span>
              </a>
            </Link>
          ))}
      </span>
    </li>
  );
}
