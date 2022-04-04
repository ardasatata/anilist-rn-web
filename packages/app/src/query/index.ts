import gql from "graphql-tag";

export const GET_ANIME_LIST = gql`
  query AnimeList($page: Int, $perPage: Int, $sort: [MediaSort], $search: String) {
    Page(page: $page, perPage: $perPage) {
      media(sort: $sort, search: $search) {
        coverImage {
          large
          color
        }
        title {
          romaji
          english
          native
          userPreferred
        }
        type
        popularity
        averageScore
        id
      }
    }
  }
`;

export const GET_ANIME_DETAIL = gql`
  query AnimeDetail($id: Int) {
    Media(id: $id){
      id
      title {
        romaji
        english
        native
        userPreferred
      }
      description
      type
      bannerImage 
      coverImage {
        extraLarge
        large
        medium
        color
      }
      popularity
      isAdult
    }
  }
`;