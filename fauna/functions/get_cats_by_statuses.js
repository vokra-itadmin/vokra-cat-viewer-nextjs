import { query as q } from "faunadb";

export default {
  name: "get_cats_by_statuses",
  role: null,
  body: q.Query(
    q.Lambda(
      ["Statuses"],
      q.Map(
        q.Select(
          "data",
          q.Paginate(
            q.Union(
              q.Map(
                q.Var("Statuses"),
                q.Lambda("i", q.Match(q.Index("findCatsByStatus"), q.Var("i")))
              )
            ),
            { size: 100000 }
          )
        ),
        q.Lambda("j", q.Get(q.Var("j")))
      )
    )
  ),
};
