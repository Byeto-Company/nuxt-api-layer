import "axios";
import type { AxiosError } from "axios";

export default defineAppConfig({});

declare module "@nuxt/schema" {
    interface AppConfigInput {
        appApi?: {
            errorCallback?: (errors: string[]) => void;
            unhandledErrorCallback?: () => void;
        };
    }
}

declare module "axios" {
    export interface AxiosRequestConfig {
        authorization?: boolean;
    }
}

declare global {
    type ApiPaginated<T> = {
        count: number;
        next: string | null;
        previous: string | null;
        results: T[];
    };

    type ApiErrorData = Record<string, (string | ApiErrorData)[]>;

    type ApiError = AxiosError<ApiErrorData>;
}
