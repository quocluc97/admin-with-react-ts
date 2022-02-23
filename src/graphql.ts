import { gql } from "@apollo/client"

export const GET_LIST_CHANNEL = gql`
query Channels {
  channels {
    id
    name
  }
}
`
export const GET_LIST_PROVINCE = gql`
query Provinces {
  provinces {
    id
    name
  }
}
`