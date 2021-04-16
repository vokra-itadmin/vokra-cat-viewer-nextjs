export default function Attributes({ attributes }) {
  return (
    <ul className="mx-4 flex">
      {attributes
        .filter((attribute) => attribute.Publish === "Yes")
        .map((attribute) => (
          <li className="bg-gray-200 text-gray-600 text-sm rounded-sm m-0.5 px-2 py-1">
            {attribute.AttributeName}
          </li>
        ))}
    </ul>
  );
}
