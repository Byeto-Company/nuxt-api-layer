export interface NuxtApiLayer {
    ApiErrorData: unknown; 
}

declare global {
    type ApiError = AxiosError<NuxtApiLayer["ApiErrorData"]>;
}

// type ApiPaginated<T, D = object> = {
//     count: number;
//     next: string | null;
//     previous: string | null;
//     results: T[];
//     data?: D;
// };
// type ApiErrorData = Record<string, (string | ApiErrorData)[]>;
// type ApiError = AxiosError<ApiErrorData>;
