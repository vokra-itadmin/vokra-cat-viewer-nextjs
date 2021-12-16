import { fetchCats } from "../../../../lib/api";
import {
  listCats,
  createCatEntry,
  findCat,
  updateCat,
  listInternalIds,
} from "../../../../lib/fauna";
import FETCH_URL from "../../../../config/api";

const parseInternalIdResp = (resp) => {
  return resp
    .filter((element) => element.findCatByInternalId !== null)
    .map((element) => element.findCatByInternalId.InternalID);
};

const handleFoundInternalIdResp = async (found, promises) => {
  const resp = await Promise.all(promises);
  found = found.concat(parseInternalIdResp(resp));
  promises = [];
};

export default async function handler(req, res) {
  const { since } = req.body;
  const cats = await fetchCats(FETCH_URL, "", since);
  let promises = [];
  let errors = [];
  let found = [];
  let count = 0;
  for (let cat of cats) {
    promises.push(findCat(cat["Internal-ID"]));
    if (promises.length === 100) {
      const resp = await Promise.all(promises);
      found = found.concat(parseInternalIdResp(resp));
      promises = [];
    }
  }
  const resp = await Promise.all(promises);
  found = found.concat(parseInternalIdResp(resp));
  promises = [];
  for (let cat of cats) {
    count++;
    if (found.includes(cat.InternalID)) {
      promises.push(
        fetch("http://localhost:3000/api/cats", {
          method: "PUT",
          body: JSON.stringify(cat),
          headers: { "Content-Type": "application/json" },
        })
      );
    } else {
      promises.push(
        fetch("http://localhost:3000/api/cats", {
          method: "POST",
          body: JSON.stringify(cat),
          headers: { "Content-Type": "application/json" },
        })
      );
    }
    if (promises.length === 100) {
      const resp = await Promise.all(promises);

      for (let el of resp) {
        if (el.status !== 200) {
          errors.push({ status: el.status, statusText: el.statusText });
        }
      }
      promises = [];
    }
    console.log("count: ", count);
  }
  res.status(200).json({ errors: errors });
}
