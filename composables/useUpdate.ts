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
