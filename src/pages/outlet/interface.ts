import { FilterOptionsString, QueryResult, QueryResultEntity } from "../../interfaces"

export interface OutletQueryResultEntity extends QueryResultEntity {
    name: string | null
    code: string | null
    address: string | null
}

export interface OutletQueryResult extends QueryResult {
    entities: OutletQueryResultEntity[]
}

export interface OutletQueryFilterInput {
    username?: FilterOptionsString
    displayName?: FilterOptionsString
    role?: FilterOptionsString
}