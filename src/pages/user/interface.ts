import { FilterOptionsString, QueryResult, QueryResultEntity } from "../../interfaces"

export interface UserQueryResultEntity extends QueryResultEntity {
    username: string
    displayName: string
    role: string
}

export interface UserQueryResult extends QueryResult {
    entities: UserQueryResultEntity[]
}

export interface UserQueryFilterInput {
    username?: FilterOptionsString
    displayName?: FilterOptionsString
    role?: FilterOptionsString
}