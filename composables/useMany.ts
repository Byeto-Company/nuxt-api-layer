// imports

import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiManyResourceOptions<TResponse> = {
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

const useMany = <TResponse>({
    customResource,
    urlSearchParams,
    queryOptions,
    axiosOptions,
    axiosInstance,
    handleError,
    authorization,
}: ApiManyResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    // methods

    const handleMany = async () => {
        const { data } = await axios.get<TResponse[]>(`${customResource?.path}`, {
            params: {
                ...urlSearchParams?.value,
            },
            ...axiosOptions,
            authorization,
        });

        return data;
    };

    return useQuery<TResponse[], ApiError>({
        queryKey: [customResource?.name, urlSearchParams],
        queryFn: () => handleMany(),
        meta: { handleError: handleError },
        ...queryOptions,
    });
};

export default useMany;
