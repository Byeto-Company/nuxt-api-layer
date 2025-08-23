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

/**
 * Composable for fetching multiple API resources (a list/collection) using Axios + TanStack Query's `useQuery`.
 *
 * @template TResponse - The type of the individual resource items returned by the API.
 *
 * @param {Object} options - Options for configuring the query.
 * @param {Object} [options.customResource] - Optional custom resource configuration.
 * @param {string} options.customResource.name - The resource name (used as part of the query key).
 * @param {string} options.customResource.path - The API path for the resource.
 * @param {ComputedRef<Record<any, any>>} [options.urlSearchParams] - Optional query parameters as a computed ref.
 * @param {AxiosInstance} [options.axiosInstance] - Optional Axios instance (defaults to Nuxt global `$axios`).
 * @param {Omit<AxiosRequestConfig, "params">} [options.axiosOptions] - Optional Axios request configuration.
 * @param {Partial<Omit<UseQueryOptions<TResponse>, "queryKey" | "queryFn">>} [options.queryOptions]
 *        Extra query options from TanStack Query.
 * @param {boolean} [options.handleError] - Whether to handle errors with a global handler.
 * @param {boolean} [options.authorization] - Whether to include authorization headers.
 *
 * @returns {UseQueryResult<TResponse[], ApiError>}
 *          A TanStack Query result object for multiple resources.
 * @module composables/useMany
 */
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
