export default function Attributes({ cats, cat, setCatDetails, setDismiss }) {
  return (
    <ul className="mx-4 flex">
      {cat.Attributes.filter((attribute) => attribute.Publish === "Yes").map(
        (attribute) => (
          <li className="bg-gray-200 text-gray-600 text-sm rounded-sm m-0.5 px-2 py-1 mt-2">
            {attribute.AttributeName === "Bonded"
              ? "Bonded to "
              : attribute.AttributeName}
            <span className="space-x-1">
              {cats
                .filter(
                  (i) =>
                    i.LitterGroupId === cat.LitterGroupId &&
                    i.ID !== cat.ID &&
                    attribute.AttributeName === "Bonded"
                )
                .map((i) => (
                  <span
                    className="cursor-pointer underline"
                    onClick={() => {
                      setCatDetails(i.ID);
                    }}
                  >
                    {i.Name}
                  </span>
                ))}
            </span>
          </li>
        )
      )}
    </ul>
  );
}
