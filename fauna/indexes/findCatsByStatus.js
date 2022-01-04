import { query as q } from "faunadb";

export default {
  name: "findCatsByStatus",
  unique: false,
  serialized: true,
  source: q.Collection("Cat"),
  terms: [
    {
      field: ["data", "Status"],
    },
  ],
};
