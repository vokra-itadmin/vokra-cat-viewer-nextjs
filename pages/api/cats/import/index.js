import { fetchCats } from "../../../../lib/api";
import {
  createCat,
  findCat,
  updateCat,
  getInternalIds,
} from "../../../../lib/fauna";
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

      const foundResp = await getInternalIds(internalIds).catch((error) =>
        console.error(error)
      );
      const found = foundResp.findCatsByInternalIds.map(
        (element) => element.InternalID
      );
      count = 0;
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
        if (found.includes(cat.InternalID)) {
          promises.push(updateCat(cat.InternalID, cat));
        } else {
          promises.push(createCat(cat));
        }
        if (
          promises.length % 100 === 0 ||
          promises.length === cats.length - count
        ) {
          const resp = await Promise.allSettled(promises).catch((err) => {
            errors.push({
              type: "promise",
              cat: cat.InternalID,
              content: JSON.stringify(err),
            });
            console.error(err);
          });

          if (resp) {
            for (let element of resp) {
              if (element.status === "fulfilled") {
                successes++;
              } else {
                errors.push({
                  type: "gql",
                  cat: cat.InternalID,
                  content: JSON.stringify(element.reason),
                });
              }
            }
          }
          promises = [];
          count += 100;
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
