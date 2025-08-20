// imports

import { type UseQueryOptions, useQuery } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiOneResourceOptions<TResponse> = {
    id?: MaybeRef<string | number>;
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
    handleError?: boolean;
    authorization?: boolean;
};

const useOne = <TResponse>({
    customResource,
    urlSearchParams,
    id,
    queryOptions,
    axiosOptions,
    axiosInstance,
    handleError,
    authorization,
}: ApiOneResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    // methods

    const handleOne = async () => {
        const { data } = await axios.get<TResponse>(`${customResource?.path}${id ? "/" + unref(id) : ""}`, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions,
            authorization,
        });

        return data;
    };

    return useQuery<TResponse, ApiError>({
        queryKey: [customResource?.name, id, urlSearchParams],
        queryFn: () => handleOne(),
        meta: { handleError: handleError },
        ...queryOptions,
    });
};

export default useOne;
