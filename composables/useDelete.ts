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

    const handleDelete = async (variables: TRequest & { id: number | string }) => {
        const { data } = await axios.delete<TResponse>(
            `${customResource?.path}/${variables.id}`,
            {
                params: { ...urlSearchParams?.value },
                data: { ...variables, id: undefined },
                ...axiosOptions,
                authorization,
            }
        );

        return data;
    };

    return useMutation<TResponse, ApiError, TRequest & { id: number | string }>({
        mutationKey: customResource?.name ? [customResource.name] : undefined,
        mutationFn: (variables) => handleDelete(variables),
        meta: { handleError: handleError },
        ...mutationOptions,
    });
};

export default useDelete;
