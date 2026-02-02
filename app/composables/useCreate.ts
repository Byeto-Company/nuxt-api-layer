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
