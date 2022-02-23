import { gql } from "@apollo/client";

export const GET_LIST_OUTLET = gql`
query Outlets($pagination: ViewOutletEntityPaginationInput) {
  outlets(pagination: $pagination) {
    count
    entities {
      id
      name
      code
      address
    }
  }
}
`

