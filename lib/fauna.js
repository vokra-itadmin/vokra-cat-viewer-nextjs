import { GraphQLClient, gql } from "graphql-request";

const CLIENT_SECRET =
  process.env.FAUNA_ADMIN_KEY || process.env.FAUNA_CLIENT_SECRET;
const FAUNA_GRAPHQL_BASE_URL = "https://graphql.fauna.com/graphql";

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers: {
    authorization: `Bearer ${CLIENT_SECRET}`,
  },
});

export const listCats = () => {
  const query = gql`
    query AllCatsQuery {
      allCats {
        data {
          Name
          ID
          InternalID
          LitterGroupId
          Type
          CurrentLocation {
            Tier1
            Tier2
            Tier3
          }
          Sex
          Status
          InFoster
          AssociatedPerson {
            FirstName
            LastName
            OutDateUnixTime
            RelationshipType
          }
          CurrentWeightPounds
          Size
          Altered
          DOBUnixTime
          Age
          CoverPhoto
          Photos
          Videos {
            VideoId
            EmbedUrl
            YoutubeUrl
            ThumbUrl
          }
          Breed
          Color
          Pattern
          AdoptionFeeGroup {
            Id
            Name
            Price
            Discount
            Tax
          }
          Description
          PreviousIds {
            IdValue
            IssuingShelter
            Type
          }
          Microchips {
            Id
            Issuer
            ImplantUnixTime
          }
          LastIntakeUnixTime
          LastUpdatedUnixTime
          Attributes {
            AttributeName
            Publish
            InternalID
          }
        }
      }
    }
  `;

  return graphQLClient.request(query, { size: 999 });
};

export const createCatEntry = (newEntry) => {
  const mutation = gql`
    mutation CreateCat($input: CatInput!) {
      createCat(data: $input) {
        Name
        ID
        InternalID
        LitterGroupId
        Type
        CurrentLocation {
          Tier1
          Tier2
          Tier3
        }
        Sex
        Status
        InFoster
        AssociatedPerson {
          FirstName
          LastName
          OutDateUnixTime
          RelationshipType
        }
        CurrentWeightPounds
        Size
        Altered
        DOBUnixTime
        Age
        CoverPhoto
        Photos
        Videos {
          VideoId
          EmbedUrl
          YoutubeUrl
          ThumbUrl
        }
        Breed
        Color
        Pattern
        AdoptionFeeGroup {
          Id
          Name
          Price
          Discount
          Tax
        }
        Description
        PreviousIds {
          IdValue
          IssuingShelter
          Type
        }
        Microchips {
          Id
          Issuer
          ImplantUnixTime
        }
        LastIntakeUnixTime
        LastUpdatedUnixTime
        Attributes {
          AttributeName
          Publish
          InternalID
        }
      }
    }
  `;
  return graphQLClient.request(mutation, { input: newEntry });
};
