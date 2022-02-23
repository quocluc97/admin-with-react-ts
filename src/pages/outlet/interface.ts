import { FilterOptionsString, QueryPaginationInput, QueryResult, QueryResultEntity } from "../../interfaces"

export interface OutletQueryResultEntity extends QueryResultEntity {
    name: string | null
    code: string | null
    address: string | null
}

export interface OutletQueryResultData extends QueryResult {
    entities: OutletQueryResultEntity[]
}

export interface OutletQueryResult extends QueryResult {
    outlets: OutletQueryResultData
}

export interface OutletQueryFilterInput {
    name?: FilterOptionsString
    code?: FilterOptionsString
}

export interface OutletQueryPaginationInput extends QueryPaginationInput {
    where?: OutletQueryFilterInput[]
}

export interface AddOutletForm {
    name: string
    code: string
    address: string
    province: number
    channel: number
}
