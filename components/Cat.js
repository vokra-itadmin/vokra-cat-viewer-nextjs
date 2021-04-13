export default function Cat({ cat }) {
  return (
    <div>
      <img src={cat.CoverPhoto}></img>
      <h1>{cat.Name}</h1>
      <p>
        <span>{cat.Breed} </span>
        <span>{cat.Color} </span>
        <span>{cat.Pattern}</span>
      </p>
      <p>{cat.Description}</p>
    </div>
  );
}
