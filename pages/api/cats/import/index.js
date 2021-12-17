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
  const start_time = Math.floor(Date.now() / 1000);
  const cats = await fetchCats(FETCH_URL, "", since);
  let promises = [];
  let errors = [];
  let found = [];
  let successes = 0;
  let count = 0;

  for (let cat of cats) {
    promises.push(findCat(cat["Internal-ID"]));
    if (promises.length === 100 || promises.length === cats.length - count) {
      const resp = await Promise.all(promises).catch((err) =>
        errors.push({ type: "promise", reason: err })
      );

      for (let el of resp) {
        if (!el.findCatByInternalId) {
          errors.push({
            cat: cat.InternalID,
            error: "Unknown error during cat create/add",
            response: el,
          });
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
      const resp = await Promise.all(promises).catch((err) =>
        errors.push({ type: "promise", reason: err })
      );
      for (let el of resp) {
        if (el.updateCatByInternalId) {
          successes++;
        } else {
          errors.push({
            cat: cat.InternalID,
            error: "Unknown error during cat create/add",
            response: el,
          });
        }
      }
      promises = [];
      count += 100;
    }
  }
  res.status(200).json({
    since: since,
    start_time: start_time,
    end_time: Math.floor(Date.now() / 1000),
    trys: cats.length,
    successes: successes,
    errors: errors,
  });
}
