import { query as q } from "faunadb";

export default {
  name: "findCatByInternalId",
  unique: false,
  serialized: true,
  source: q.Collection("Cat"),
  terms: [
    {
      field: ["data", "InternalID"],
    },
  ],
};
