import { query as q } from "faunadb";

export default {
  name: "get_cat_attributes_all",
  role: null,
  body: q.Query(
    q.Lambda(
      ["Attributes"],
      q.Select(
        "data",
        q.Map(
          q.Filter(
            q.Paginate(q.Match(q.Index("allCats"))),
            q.Lambda(
              "X",
              q.All(
                q.Map(
                  q.Select(["data", "Attributes"], q.Get(q.Var("X"))),
                  q.Lambda(
                    "Y",
                    q.Any(
                      q.Map(
                        q.Var("Attributes"),
                        q.Lambda(
                          "I",
                          q.Equals(
                            q.Select("AttributeName", q.Var("I")),
                            q.Select("AttributeName", q.Var("Y"))
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          ),
          q.Lambda("Z", q.Get(q.Var("Z")))
        )
      )
    )
  ),
};
