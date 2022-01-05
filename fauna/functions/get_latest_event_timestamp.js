import { query as q } from "faunadb";

export default {
  name: "get_latest_event_timestamp",
  role: null,
  body: q.Query(
    q.Lambda(
      "_",
      q.Max(
        q.Select(
          ["data"],
          q.Paginate(q.Match(q.Index("eventsTimeStartTimestamp")), {
            before: null,
          })
        )
      )
    )
  ),
};
