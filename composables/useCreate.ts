// imports

import { useMutation, type UseMutationOptions } from "@tanstack/vue-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

// types

export type ApiCreateResourceOptions<TResponse> = {
    customResource?: {
        name?: string;
        path: string;
    };
    urlSearchParams?: ComputedRef<Record<any, any>>;
    axiosInstance?: AxiosInstance;
    axiosOptions?: Omit<AxiosRequestConfig, "params">;
    mutationOptions?: Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>;
    contentType?: "json" | "form";
    handleError?: boolean;
    authorization?: boolean;
};

/**
 * Composable for creating API resources with Axios + TanStack Query mutation.
 *
 * @template TResponse - The expected response type of the API.
 * @template TRequest - The type of the request payload.
 *
 * @param {Object} options - Options for configuring the API request.
 * @param {Object} [options.customResource] - Optional custom resource config.
 * @param {string} [options.customResource.name] - Optional resource name (used as mutation key).
 * @param {string} options.customResource.path - The API endpoint path for the resource.
 * @param {ComputedRef<Record<any, any>>} [options.urlSearchParams] - Optional search params passed as query.
 * @param {AxiosInstance} [options.axiosInstance] - Optional Axios instance (defaults to Nuxt global $axios).
 * @param {Omit<AxiosRequestConfig, "params">} [options.axiosOptions] - Optional Axios request config.
 * @param {Partial<Omit<UseMutationOptions<TResponse>, "queryKey" | "queryFn">>} [options.mutationOptions]
 *        Extra mutation options from TanStack Query.
 * @param {"json" | "form"} [options.contentType="json"] - Content type for the request body.
 * @param {boolean} [options.handleError] - Whether errors should be handled by a global handler.
 * @param {boolean} [options.authorization] - Whether to include authorization headers.
 *
 * @returns {UseMutationResult<TResponse, ApiError, TRequest>} 
 *          A TanStack Query mutation object.
 * @module composables/useCreate
 */
const useCreate = <TResponse, TRequest>({
    urlSearchParams,
    axiosOptions,
    mutationOptions,
    customResource,
    axiosInstance,
    contentType = "json",
    handleError,
    authorization,
}: ApiCreateResourceOptions<TResponse>) => {
    // state

    const { $axios: globalAxiosInstance } = useNuxtApp();

    const axios = axiosInstance ?? globalAxiosInstance;

    // methods

    const handleCreate = async (variables: TRequest) => {
        const { data } = await axios.post<TResponse>(`${customResource?.path}`, variables, {
            params: { ...urlSearchParams?.value },
            ...axiosOptions,
            headers: {
                "Content-Type": contentType === "form" ? "multipart/form-data" : "application/json",
                ...axiosOptions?.headers,
            },
            authorization,
        });

        return data;
    };

    return useMutation<TResponse, ApiError, TRequest>({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
        mutationFn: (variables) => handleCreate(variables),
        meta: { handleError: handleError },
        ...mutationOptions,
    });
};

export default useCreate;
