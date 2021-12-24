import { query as q } from "faunadb";

export default {
  name: "update_cat_internal_id",
  role: null,
  body: q.Query(
    q.Lambda(
      ["InternalID", "updatedCat"],
      q.Update(
        q.Select(
          0,
          q.Paginate(
            q.Match(q.Index("findCatByInternalId"), q.Var("InternalID"))
          )
        ),
        { data: q.Var("updatedCat") }
      )
    )
  ),
};
