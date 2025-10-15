// imports

import { useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiDeleteResourceOptions<TResponse> = {
    customResource?: {
        name?: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: AxiosRequestConfig;
    mutationOptions?: Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>;
    handleError?: boolean;
    authorization?: boolean;
};

/**
 * Composable for deleting API resources with Axios + TanStack Query mutation.
 *
 * @template TResponse - The expected response type of the API.
 * @template TRequest - The type of the request payload (must include an `id`).
 *
 * @param {Object} options - Options for configuring the API request.
 * @param {Object} [options.customResource] - Optional custom resource config.
 * @param {string} [options.customResource.name] - Optional resource name (used as mutation key).
 * @param {string} options.customResource.path - The base API endpoint path for the resource.
 * @param {ComputedRef<Record<any, any>>} [options.urlSearchParams] - Optional search params passed as query.
 * @param {AxiosInstance} [options.axiosInstance] - Optional Axios instance (defaults to Nuxt global $axios).
 * @param {AxiosRequestConfig} [options.axiosOptions] - Optional Axios request config.
 * @param {Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>} [options.mutationOptions]
 *        Extra mutation options from TanStack Query.
 * @param {boolean} [options.handleError] - Whether errors should be handled by a global handler.
 * @param {boolean} [options.authorization] - Whether to include authorization headers.
 *
 * @returns {UseMutationResult<TResponse, ApiError, TRequest & { id: number | string }>}
 *          A TanStack Query mutation object.
 * @module composables/useDelete
 */
const useDelete = <TResponse, TRequest>({
    urlSearchParams,
    axiosOptions,
    axiosInstance,
    mutationOptions,
    customResource,
    handleError,
    authorization,
}: ApiDeleteResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    // methods

    const handleDelete = async (variables: TRequest & { id?: number | string }) => {
        const { data } = await axios.delete<TResponse>(`${customResource?.path}/${variables.id ?? ""}`, {
            params: { ...urlSearchParams?.value },
            data: { ...variables, id: undefined },
            ...axiosOptions,
            authorization,
        });

        return data;
    };

    return useMutation<TResponse, ApiError, TRequest & { id?: number | string }>({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
        mutationFn: (variables) => handleDelete(variables),
        meta: { handleError: handleError },
        ...mutationOptions,
    });
};

export default useDelete;
