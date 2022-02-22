export interface LoginResult {
    access_token: string;
    username: string;
    display_name: string
    role: string;
}
export interface UserLogin {
    username: string
    displayName: string
    token: string
    role: string
}
export interface AuthContextType {
    user: UserLogin | null
    signin: (user: UserLogin, callback: VoidFunction) => void
    signout: (callback: VoidFunction) => void
}

export interface QueryResultEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: Boolean;
    status: string;
}

export interface QueryResult {
    count: number;
}

export interface OutletQueryResultEntity {
    id: number
    code: string
    name: string
}
export interface OutletQueryResultData {
    count: number
    entities: OutletQueryResultEntity[]
}
export interface OutletQueryResult {
    outlets: OutletQueryResultData
}

export interface OutletFilterInput {
    code?: string
    name?: string
}

export class FilterOptions<T> {
    public contains?: T
    public value?: T
}

export class FilterOptionsString extends FilterOptions<string> { }

export interface OutletQueryFilerInput {
    code?: FilterOptionsString
    name?: FilterOptionsString
}

export class QueryPaginationInput {
    public take?= 10
    public skip?= 0
}