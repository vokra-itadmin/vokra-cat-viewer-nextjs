import { query as q } from "faunadb";

export default {
  name: "eventsTimeStartTimestamp",
  unique: false,
  serialized: true,
  source: q.Collection("Event"),
  values: [
    {
      field: ["data", "startTime"],
    },
  ],
};
