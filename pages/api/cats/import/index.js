import { fetchCats } from "../../../../lib/api";
import {
  createCats,
  updateCats,
  getInternalIds,
  createEvent,
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
      }
      const foundResp = await getInternalIds(internalIds).catch((error) =>
        console.error(error)
      );

      const found = new Set();

      foundResp.findCatsByInternalIds.forEach((element) =>
        found.add(element.InternalID)
      );

      const creates = [];
      const updates = [];

      for (let i = 0; i < cats.length; i++) {
        if (found.has(cats[i].InternalID)) {
          updates.push({ InternalID: cats[i].InternalID, Cat: cats[i] });
        } else {
          creates.push(cats[i]);
        }
      }

      const batchSize = 200;
      let promises = [];

      for (let i = 0; i < creates.length; i += batchSize) {
        promises.push(createCats(creates.slice(i, i + batchSize)));
      }
      for (let i = 0; i < updates.length; i += batchSize) {
        promises.push(updateCats(updates.slice(i, i + batchSize)));
      }

      let errors = [];
      let successes = 0;

      for (let i = 0; i < promises.length; i += 100) {
        const batch = promises.slice(i, i + 100);
        const resp = await Promise.allSettled(batch).catch((error) => {
          errors.push({
            type: "promise",
            content: JSON.stringify(error),
          });
          console.error(error);
        });

        if (resp) {
          for (let element of resp) {
            if (element.status === "fulfilled") {
              successes += batch.length;
            } else {
              errors.push({
                type: "gql",
                content: JSON.stringify(element.reason),
              });
            }
          }
        }
      }
      const respEvent = await createEvent({
        since,
        startTime,
        endTime: Math.floor(Date.now() / 1000),
        tries: cats.length,
        successes,
        errors,
      });
      res.status(200).json(respEvent.createEvent);
    } else {
      res.status(401);
    }
  }
}
