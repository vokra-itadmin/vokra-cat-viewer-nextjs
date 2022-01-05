import { query as q } from "faunadb";

export default {
  name: "create_cats",
  role: null,
  body: q.Query(
    q.Lambda(
      ["Cats"],
      q.Map(
        q.Var("Cats"),
        q.Lambda("i", q.Create(q.Collection("Cat"), { data: q.Var("i") }))
      )
    )
  ),
};
