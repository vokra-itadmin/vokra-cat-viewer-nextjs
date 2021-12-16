import {
  listCats,
  createCatEntry,
  findCat,
  updateCat,
} from "../../../lib/fauna";

export default async function handler(req, res) {
  const handlers = {
    GET: async () => {
      const { InternalID } = req.query;
      if (InternalID) {
        const cat = await findCat(InternalID);
        res.json(cat.findCatByInternalId);
      } else {
        const rawCats = await listCats();
        const cats = rawCats.allCats.data;
        res.json(cats);
      }
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
      let Attributes = null;
      if (req.body.Attributes) {
        Attributes = req.body.Attributes.map((element) => {
          return {
            InternalID: element["Internal-ID"],
            AttributeName: element.AttributeName,
            Publish: element.Publish,
          };
        });
      }
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
    PUT: async () => {
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
      let Attributes = null;
      if (req.body.Attributes) {
        Attributes = req.body.Attributes.map((element) => {
          return {
            InternalID: element["Internal-ID"],
            AttributeName: element.AttributeName,
            Publish: element.Publish,
          };
        });
      }
      const updated = await updateCat(InternalID, {
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
      res.json(updated);
    },
  };

  if (!handlers[req.method]) {
    return res.status(405).end();
  }

  await handlers[req.method]();
}
