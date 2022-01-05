import { query as q } from "faunadb";

export default {
  name: "update_cats_internal_ids",
  role: null,
  body: q.Query(
    q.Lambda(
      ["Cats"],
      q.Map(
        q.Var("Cats"),
        q.Lambda(
          "i",
          q.Call(q.Function("update_cat_internal_id"), [
            q.Select("InternalID", q.Var("i")),
            q.Select("Cat", q.Var("i")),
          ])
        )
      )
    )
  ),
};
