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

/**
 * Composable for fetching paginated API resources using Axios + TanStack Query's `useInfiniteQuery`.
 *
 * @template TResponse - The type of the individual resource items returned by the API.
 *
 * @param {Object} options - Options for configuring the infinite query.
 * @param {ComputedRef<Record<any, any>>} [options.urlSearchParams] - Optional query parameters as a computed ref.
 * @param {Object} [options.customResource] - Optional custom resource configuration.
 * @param {string} options.customResource.name - The resource name (used as part of the query key).
 * @param {string} options.customResource.path - The API path for the resource.
 * @param {MaybeRefOrGetter<{ pagination?: { limit?: number } }>} [options.options] - Additional options, such as pagination.
 * @param {AxiosInstance} [options.axiosInstance] - Optional Axios instance (defaults to Nuxt global `$axios`).
 * @param {Omit<AxiosRequestConfig, "params">} [options.axiosOptions] - Optional Axios request configuration.
 * @param {Partial<Omit<UseInfiniteQueryOptions<TResponse>, "queryKey" | "queryFn">>} [options.queryOptions]
 *        Extra query options from TanStack Query.
 * @param {boolean} [options.handleError] - Whether to handle errors with a global handler.
 * @param {boolean} [options.authorization] - Whether to include authorization headers.
 *
 * @returns {UseInfiniteQueryResult<ApiPaginated<TResponse>, ApiError>}
 *          A TanStack Query infinite query result object.
 * @module composables/useInfiniteMany
 */
const useInfiniteMany = <TResponse, TData = object>({
    urlSearchParams,
    options,
    queryOptions,
    axiosOptions,
    axiosInstance,
    handleError,
    authorization,
    customResource,
}: ApiInfiniteManyResourceOptions<ApiPaginated<TResponse, TData>>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    const limitParam = useRouteQuery("limit", "10", { transform: Number });

    const optionsObject = computed(() => toValue(options));

    const limit = computed(() => optionsObject.value?.pagination?.limit ?? limitParam.value);

    // methods

    const handleInfiniteMany = async ({ limit, offset }: any) => {
        const { data } = await axios.get<ApiPaginated<TResponse, TData>>(`${customResource?.path}/`, {
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

    return useInfiniteQuery<ApiPaginated<TResponse, TData>, ApiError>({
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
