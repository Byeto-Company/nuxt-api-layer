// imports

import { useQuery, type UseQueryOptions } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiPaginatedManyResourceOptions<TResponse> = {
    customResource?: {
        name: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    options?: MaybeRefOrGetter<{
        pagination?: {
            page?: number;
            limit?: number;
            initialOffset?: number;
        };
    }>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    queryOptions?: Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>;
    handleError?: boolean;
    authorization?: boolean;
};

/**
 * Composable for fetching a paginated list of API resources using Axios + TanStack Query's `useQuery`.
 *
 * @template TResponse - The type of each item in the paginated response.
 *
 * @param {Object} options - Options for configuring the query.
 * @param {Object} [options.customResource] - Optional custom resource configuration.
 * @param {string} options.customResource.name - The resource name (used as part of the query key).
 * @param {string} options.customResource.path - The API path for the resource.
 * @param {ComputedRef<Record<any, any>>} [options.urlSearchParams] - Optional query parameters as a computed ref.
 * @param {MaybeRefOrGetter<{ pagination?: { page?: number; limit?: number; initialOffset?: number } }>} [options.options]
 *        Pagination options:
 *        - `page`: Current page (default: taken from `?page=` query param or 1).
 *        - `limit`: Items per page (default: taken from `?limit=` query param or 10).
 *        - `initialOffset`: Explicit offset (default: taken from `?offset=` query param).
 * @param {AxiosInstance} [options.axiosInstance] - Optional Axios instance (defaults to Nuxt global `$axios`).
 * @param {Omit<AxiosRequestConfig, "params">} [options.axiosOptions] - Optional Axios request configuration.
 * @param {Partial<Omit<UseQueryOptions<ApiPaginated<TResponse>>, "queryKey" | "queryFn">>} [options.queryOptions]
 *        Extra query options from TanStack Query.
 * @param {boolean} [options.handleError] - Whether to handle errors with a global handler.
 * @param {boolean} [options.authorization] - Whether to include authorization headers.
 *
 * @returns {UseQueryResult<ApiPaginated<TResponse>, ApiError>}
 *          A TanStack Query result object containing paginated resource data.
 * @module composables/useDelete
 */
const usePaginatedMany = <TResponse, TData = object>({
    customResource,
    urlSearchParams,
    options,
    queryOptions,
    axiosOptions,
    axiosInstance,
    handleError,
    authorization,
}: ApiPaginatedManyResourceOptions<ApiPaginated<TResponse, TData>>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();
    const axios = axiosInstance ?? globalAxiosInstance;

    const pageParam = useRouteQuery("page", "1", { transform: Number });
    const limitParam = useRouteQuery("limit", "10", { transform: Number });
    const offsetParam = useRouteQuery("offset", undefined, {
        transform: (value) => (value ? Number(value) : undefined),
    });

    const optionsObject = computed(() => toValue(options));

    const limit = computed(() => optionsObject.value?.pagination?.limit ?? limitParam.value);
    const page = computed(() => optionsObject.value?.pagination?.initialOffset ?? pageParam.value);
    const initialOffset = computed(() => optionsObject.value?.pagination?.initialOffset ?? offsetParam.value);

    // methods

    const handleMany = async () => {
        const { data } = await axios.get<ApiPaginated<TResponse, TData>>(`${customResource?.path}`, {
            params: {
                ...urlSearchParams?.value,
                limit: limit.value,
                offset: initialOffset.value ?? page.value * limit.value - limit.value,
            },
            ...axiosOptions,
            authorization,
        });

        return data;
    };

    return useQuery<ApiPaginated<TResponse, TData>, ApiError>({
        queryKey: [customResource?.name, urlSearchParams, page],
        queryFn: () => handleMany(),
        meta: { handleError: handleError },
        ...queryOptions,
    });
};

export default usePaginatedMany;
