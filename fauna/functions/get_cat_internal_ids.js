import { query as q } from "faunadb";

export default {
  name: "get_cat_internal_ids",
  role: null,
  body: q.Query(
    q.Lambda(
      ["InternalIDs"],
      q.Map(
        q.Filter(
          q.Var("InternalIDs"),
          q.Lambda(
            "j",
            q.IsNonEmpty(q.Match(q.Index("findCatByInternalId"), q.Var("j")))
          )
        ),
        q.Lambda(
          "i",
          q.Get(q.Match(q.Index("findCatByInternalId"), q.Var("i")))
        )
      )
    )
  ),
};
