import type { AxiosError } from "axios";

export namespace NuxtApiLayer {
    export interface Config {
        ApiErrorData: unknown;
    }
}

declare global {
    type ApiError = AxiosError<NuxtApiLayer.Config["ApiErrorData"]>;
}

export interface NuxtApiLayer extends NuxtApiLayer.Config {}

// type ApiPaginated<T, D = object> = {
//     count: number;
//     next: string | null;
//     previous: string | null;
//     results: T[];
//     data?: D;
// };
// type ApiErrorData = Record<string, (string | ApiErrorData)[]>;
// type ApiError = AxiosError<ApiErrorData>;
