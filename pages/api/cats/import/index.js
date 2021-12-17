import { fetchCats } from "../../../../lib/api";
import { createCat, findCat, updateCat } from "../../../../lib/fauna";
import FETCH_URL from "../../../../config/api";

const parseInternalIdResp = (resp) => {
  return resp
    .filter((element) => element.findCatByInternalId !== null)
    .map((element) => element.findCatByInternalId.InternalID);
};

export default async function handler(req, res) {
  const { since } = req.body;
  const startTime = Math.floor(Date.now() / 1000);
  const cats = await fetchCats(FETCH_URL, "", since);
  let promises = [];
  let errors = [];
  let found = [];
  let successes = 0;
  let count = 0;

  for (let cat of cats) {
    promises.push(findCat(cat["Internal-ID"]));
    if (promises.length === 100 || promises.length === cats.length - count) {
      const resp = await Promise.all(promises).catch((err) => {
        errors.push({
          type: "gql",
          cat: cat.InternalID,
          content: JSON.stringify(err),
        });
        console.error(err);
      });

      if (resp) {
        for (let element of resp) {
          if (!element.findCatByInternalId) {
            errors.push({
              type: "gql",
              cat: cat.InternalID,
              content: "Unknown error during findCat",
            });
          }
        }
      }

      found = found.concat(parseInternalIdResp(resp));
      promises = [];
      count += 100;
    }
  }
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
    if (promises.length === 100 || promises.length === cats.length - count) {
      const resp = await Promise.all(promises).catch((err) => {
        errors.push({
          type: "gql",
          cat: cat.InternalID,
          content: JSON.stringify(err),
        });
        console.error(err);
      });

      if (resp) {
        for (let element of resp) {
          if (element.updateCatByInternalId) {
            successes++;
          } else {
            errors.push({
              type: "gql",
              cat: cat.InternalID,
              content: "Unknown error during cat create/update",
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
}
