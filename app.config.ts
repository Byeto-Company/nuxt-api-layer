import "axios";
import type { AxiosError, AxiosRequestHeaders } from "axios";

export default defineAppConfig({});

declare module "@nuxt/schema" {
    interface AppConfig {
        appApi?: {
            errorCallback?: (errors: string[]) => void;
            extendHeaders?: (headers: AxiosRequestHeaders) => AxiosRequestHeaders;
            unhandledErrorCallback?: () => void;
            customAuthorizationHeader?: (token: string) => string;
        };
    }

    interface AppConfigInput {
        appApi?: {
            errorCallback?: (errors: string[]) => void;
            extendHeaders?: (headers: AxiosRequestHeaders) => AxiosRequestHeaders;
            unhandledErrorCallback?: () => void;
            customAuthorizationHeader?: (token: string) => string;
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
