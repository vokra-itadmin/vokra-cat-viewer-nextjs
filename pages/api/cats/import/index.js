import { fetchCats } from "../../../../lib/api";
import { createCats, updateCats, getInternalIds } from "../../../../lib/fauna";
import FETCH_URL from "../../../../config/api";

const parseInternalIdResp = (resp) => {
  return resp
    .filter((element) => element.findCatByInternalId !== null)
    .map((element) => element.findCatByInternalId.InternalID);
};

export default async function handler(req, res) {
  if (!req.headers.action_key) {
    res.status(401).json("Access key required");
  } else {
    if (req.headers.action_key === process.env.APP_KEY) {
      const { since } = req.body;
      const startTime = Math.floor(Date.now() / 1000);
      const cats = await fetchCats(FETCH_URL, "", since);
      let promises = [];
      let errors = [];
      let successes = 0;
      let count = 0;

      const internalIds = cats.map((element) => element["Internal-ID"]);

      for (let cat of cats) {
        delete Object.assign(cat, { ["InternalID"]: cat["Internal-ID"] })[
          "Internal-ID"
        ];
        if (cat.Attributes) {
          const fixedAttributes = cat.Attributes.map((element) => {
            return {
              InternalID: element["Internal-ID"],
              AttributeName: element.AttributeName,
              Publish: element.Publish,
            };
          });
          cat.Attributes = fixedAttributes;
        }
        if (cat.CurrentLocation === null) {
          delete cat.CurrentLocation;
        }
        if (cat.AdoptionFeeGroup !== undefined) {
          if (typeof cat.AdoptionFeeGroup.Discount !== "number") {
            console.log(
              "Why isn't this an Int?",
              cat.AdoptionFeeGroup.Discount
            );
          }
        }
      }

      const foundResp = await getInternalIds(internalIds).catch((error) =>
        console.error(error)
      );
      const found = foundResp.findCatsByInternalIds.map(
        (element) => element.InternalID
      );
      count = 0;
      const creates = [];
      const updates = [];
      for (let i = 0; i < cats.length; i++) {
        if (found.includes(cats[i].InternalID)) {
          updates.push({ InternalID: cats[i].InternalID, Cat: cats[i] });
        } else {
          creates.push(cats[i]);
        }
      }
      console.log("creates.length: ", creates.length);
      console.log("updates.length: ", updates.length);
      for (let i = 0; i < creates.length; i += 100) {
        promises.push(createCats(creates.slice(i, i + 100)));
      }
      for (let i = 0; i < updates.length; i += 100) {
        promises.push(updateCats(updates.slice(i, i + 100)));
      }
      console.log("promises.length: ", promises.length);
      for (let i = 0; i < promises.length; i += 100) {
        const resp = await Promise.allSettled(promises.slice(i, i + 100)).catch(
          (err) => {
            errors.push({
              type: "promise",
              cat: cat.InternalID,
              content: JSON.stringify(err),
            });
            console.error(err);
          }
        );

        if (resp) {
          for (let element of resp) {
            if (element.status === "fulfilled") {
              successes++;
            } else {
              errors.push({
                type: "gql",
                content: JSON.stringify(element.reason),
              });
            }
          }
        }
      }

      res.status(200).json({
        since: since,
        startTime: startTime,
        endTime: Math.floor(Date.now() / 1000),
        tries: cats.length,
        successes: successes,
        errors: errors,
      });
    } else {
      res.status(401);
    }
  }
}
