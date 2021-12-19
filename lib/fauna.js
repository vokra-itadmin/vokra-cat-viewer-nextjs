import { GraphQLClient, batchRequests, gql } from "graphql-request";

const CLIENT_SECRET =
  process.env.FAUNA_ADMIN_KEY || process.env.FAUNA_CLIENT_SECRET;
const FAUNA_GRAPHQL_BASE_URL = "https://graphql.fauna.com/graphql";
const REQUEST_HEADERS = {
  headers: {
    authorization: `Bearer ${CLIENT_SECRET}`,
  },
};

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

  return graphQLClient.request(query);
};

export const listInternalIds = () => {
  const query = gql`
    query AllCatsQuery {
      allCats {
        data {
          InternalID
        }
      }
    }
  `;

  return graphQLClient.request(query);
};

export const createCat = (newEntry) => {
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

export const findCat = (InternalID) => {
  const query = gql`
    query FindCat($InternalID: String) {
      findCatByInternalId(InternalID: $InternalID) {
        InternalID
      }
    }
  `;
  return graphQLClient.request(query, { InternalID });
};

export const getInternalIds = (internalIDs) => {
  const query = gql`
    query FindCats($InternalIDs: [String]) {
      findCatsByInternalIds(InternalIDs: $InternalIDs) {
        InternalID
      }
    }
  `;
  return graphQLClient.request(query, { InternalIDs: internalIDs });
};

export const updateCat = (InternalID, updatedCat) => {
  const query = gql`
    mutation UpdateCat($InternalID: String, $updatedCat: CatInput) {
      updateCatByInternalId(InternalID: $InternalID, updatedCat: $updatedCat) {
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
  return graphQLClient.request(query, { InternalID, updatedCat });
};

export const createEvent = (newEntry) => {
  const query = gql`
    mutation CreateEvent($input: EventInput!) {
      createEvent(data: $input) {
        since
        startTime
        endTime
        tries
        successes
        errors {
          type
          cat
          content
        }
      }
    }
  `;
  return graphQLClient.request(query, { input: newEntry });
};
