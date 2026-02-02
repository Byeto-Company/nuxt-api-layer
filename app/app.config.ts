import type { QueryClientConfig } from "@tanstack/vue-query";
import "axios";
import type { AxiosRequestHeaders } from "axios";

export default defineAppConfig({});

declare module "@nuxt/schema" {
    interface AppConfig {
        appApi?: {
            errorCallback?: (error: ApiError) => void;
            extendHeaders?: (headers: AxiosRequestHeaders) => AxiosRequestHeaders;
            unhandledErrorCallback?: () => void;
            customAuthorizationHeader?: (token: string) => string;
            queryClientOptions?: QueryClientConfig;
        };
    }

    interface AppConfigInput {
        appApi?: {
            errorCallback?: (errors: ApiError) => void;
            extendHeaders?: (headers: AxiosRequestHeaders) => AxiosRequestHeaders;
            unhandledErrorCallback?: () => void;
            customAuthorizationHeader?: (token: string) => string;
            queryClientOptions?: QueryClientConfig;
        };
    }
}

declare module "axios" {
    export interface AxiosRequestConfig {
        authorization?: boolean;
    }
}

export interface NuxtApiLayer {
    ApiErrorData: unknown;
}
