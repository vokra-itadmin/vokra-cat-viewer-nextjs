import { listCats, createCatEntry } from "../../../lib/fauna";

export default async function handler(req, res) {
  const handlers = {
    GET: async () => {
      const rawCats = await listCats();
      const cats = rawCats.allCats.data;
      res.json(cats);
    },
    POST: async () => {
      const {
        Name,
        ID,
        LitterGroupId,
        Type,
        CurrentLocation,
        Sex,
        Status,
        InFoster,
        AssociatedPerson,
        CurrentWeightPounds,
        Size,
        Altered,
        DOBUnixTime,
        Age,
        CoverPhoto,
        Photos,
        Videos,
        Breed,
        Color,
        Pattern,
        Description,
        PreviousIds,
        LastIntakeUnixTime,
        LastUpdatedUnixTime,
        Microchips,
      } = req.body;
      const InternalID = req.body["Internal-ID"];
      const Attributes = req.body.Attributes.map((element) => {
        return {
          InternalID: element["Internal-ID"],
          AttributeName: element.AttributeName,
          Publish: element.Publish,
        };
      });
      const created = await createCatEntry({
        Name,
        ID,
        InternalID,
        LitterGroupId,
        Type,
        CurrentLocation,
        Sex,
        Status,
        InFoster,
        AssociatedPerson,
        CurrentWeightPounds,
        Size,
        Altered,
        DOBUnixTime,
        Age,
        CoverPhoto,
        Photos,
        Videos,
        Breed,
        Color,
        Pattern,
        Description,
        PreviousIds,
        LastIntakeUnixTime,
        LastUpdatedUnixTime,
        Microchips,
        Attributes,
      });
      res.json(created);
    },
  };

  if (!handlers[req.method]) {
    return res.status(405).end();
  }

  await handlers[req.method]();
}
