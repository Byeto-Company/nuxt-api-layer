// imports

import { useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiUpdateResourceOptions<TResponse> = {
    customResource?: {
        name?: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    mutationOptions?: Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>;
    contentType?: "form" | "json";
    handleError?: boolean;
    authorization?: boolean;
};

/**
 * Composable for updating a single API resource using Axios + TanStack Query's `useMutation`.
 *
 * @template TResponse - The expected response type from the API.
 * @template TRequest - The request payload type (must include an `id` field).
 *
 * @param {Object} options - Options for configuring the update mutation.
 * @param {Object} [options.customResource] - Optional custom resource configuration.
 * @param {string} [options.customResource.name] - Resource name (used for `mutationKey`).
 * @param {string} options.customResource.path - The API path for the resource (base path, ID is appended automatically).
 * @param {ComputedRef<Record<any, any>>} [options.urlSearchParams] - Optional query parameters as a computed ref.
 * @param {AxiosInstance} [options.axiosInstance] - Optional Axios instance (defaults to Nuxt global `$axios`).
 * @param {Omit<AxiosRequestConfig, "params">} [options.axiosOptions] - Optional Axios request configuration.
 * @param {Partial<Omit<UseMutationOptions<TResponse>, "mutationKey" | "mutationFn">>} [options.mutationOptions]
 *        Additional mutation options for TanStack Query.
 * @param {"form" | "json"} [options.contentType="json"] - Content type for the request body.
 * @param {boolean} [options.handleError] - Whether to handle errors with a global handler.
 * @param {boolean} [options.authorization] - Whether to include authorization headers.
 *
 * @returns {UseMutationResult<TResponse, ApiError, TRequest & { id: number | string }>}
 *          A TanStack Query mutation result object.
 * @module composables/useUpdate
 */
const useUpdate = <TResponse, TRequest>({
    urlSearchParams,
    axiosOptions,
    axiosInstance,
    mutationOptions,
    customResource,
    contentType = "json",
    handleError,
    authorization,
}: ApiUpdateResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    // methods

    const handleUpdate = async (variables: TRequest & { id: number | string }) => {
        const { data } = await axios.patch<TResponse>(
            `${customResource?.path}/${variables.id}`,
            { ...variables, id: undefined },
            {
                params: { ...urlSearchParams?.value },
                ...axiosOptions,
                headers: {
                    "Content-Type": contentType === "form" ? "multipart/form-data" : "application/json",
                    ...axiosOptions?.headers,
                },
                authorization,
            }
        );

        return data;
    };

    return useMutation<TResponse, ApiError, TRequest & { id: number | string }>({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
        mutationFn: (variables) => handleUpdate(variables),
        meta: { handleError: handleError },
        ...mutationOptions,
    });
};

export default useUpdate;
