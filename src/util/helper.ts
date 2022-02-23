import { useQuery } from "@apollo/client";
import { GET_LIST_CHANNEL, GET_LIST_PROVINCE } from "../graphql";
import { ChannelQueryResult, ProvinceQueryResult } from "../interfaces";

export const processPathRoute = (path: string): string => {
    return path.replace('/', '').toUpperCase();
}

export const useChannel = () => {
    const { data } = useQuery<ChannelQueryResult>(GET_LIST_CHANNEL);
    return data;
}

export const useProvince = () => {
    const { data } = useQuery<ProvinceQueryResult>(GET_LIST_PROVINCE);
    return data;
}