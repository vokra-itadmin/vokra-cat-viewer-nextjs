export async function fetchCats() {
  const res = await fetch(
    //    "https://www.shelterluv.com/api/v1/animals?status_type=publishable",
    "https://www.shelterluv.com/api/v1/animals",
    {
      method: "GET",
      headers: {
        "X-API-Key": process.env.API_KEY,
      },
    }
  );
  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json;
}

export function sanitizeCats(cats) {
  return cats.map((cat) => {
    return {
      Name: cat.Name,
      ID: cat.ID,
      Sex: cat.Sex,
      Age: cat.Age,
      CoverPhoto: cat.CoverPhoto,
      Photos: cat.Photos,
      Videos: cat.Videos,
      Breed: cat.Breed,
      Color: cat.Color,
      Pattern: cat.Pattern === undefined ? null : cat.Pattern,
      Description: cat.Description,
      Attributes: cat.Attributes,
    };
  });
}
