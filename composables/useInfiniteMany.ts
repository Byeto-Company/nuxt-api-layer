// imports

import { useInfiniteQuery, type UseInfiniteQueryOptions } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiInfiniteManyResourceOptions<TResponse> = {
    urlSearchParams?: ComputedRef<Record<any, any>>;
    customResource?: {
        name: string;
        path: string;
    };
    options?: MaybeRefOrGetter<{
        pagination?: {
            limit?: number;
        };
    }>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseInfiniteQueryOptions<TResponse>, "queryKey" | "queryFn">>;
    handleError?: boolean;
    authorization?: boolean;
};

const useInfiniteMany = <TResponse>({
    urlSearchParams,
    options,
    queryOptions,
    axiosOptions,
    axiosInstance,
    handleError,
    authorization,
    customResource,
}: ApiInfiniteManyResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    const limitParam = useRouteQuery("limit", "10", { transform: Number });

    const optionsObject = computed(() => toValue(options));

    const limit = computed(() => optionsObject.value?.pagination?.limit ?? limitParam.value);

    // methods

    const handleInfiniteMany = async ({ limit, offset }: any) => {
        const { data } = await axios.get<ApiPaginated<TResponse>>(`${customResource?.path}/`, {
            params: {
                ...urlSearchParams?.value,
                limit: limit,
                offset: offset,
            },
            ...axiosOptions,
            authorization,
        });

        return data;
    };

    return useInfiniteQuery<ApiPaginated<TResponse>, ApiError>({
        queryKey: [customResource?.name, urlSearchParams],
        queryFn: ({ pageParam }) => handleInfiniteMany(pageParam),
        initialPageParam: {
            limit: limit.value,
            offset: 0,
        },
        getNextPageParam: (lastPage, pages) => {
            const page = pages.length + 1;

            const nextPageParams = {
                offset: page * limit.value - limit.value,
                limit: limit.value,
            };

            return lastPage?.next ? nextPageParams : undefined;
        },
        meta: { handleError: handleError },

        ...queryOptions,
    });
};

export default useInfiniteMany;
