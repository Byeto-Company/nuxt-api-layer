import "axios";
import type { Mutation, MutationCache, Query, QueryCache, QueryClientConfig } from "@tanstack/vue-query";
import type { AxiosRequestHeaders } from "axios";

export default defineAppConfig({});

declare module "@nuxt/schema" {
    interface AppConfig {
        appApi?: {
            errorCallback?: (errorData: {
                error: ApiError;
                query?: Query<unknown, unknown, unknown, readonly unknown[]>;
                mutation?: Mutation<unknown, unknown, unknown, unknown>;
            }) => void;
            extendHeaders?: (headers: AxiosRequestHeaders) => AxiosRequestHeaders;
            unhandledErrorCallback?: () => void;
            customAuthorizationHeader?: (token: string) => string;
            queryClientOptions?: QueryClientConfig;
            mutationCacheOptions?: MutationCache["config"];
            queryCacheOptions?: QueryCache["config"];
        };
    }

    interface AppConfigInput {
        appApi?: {
            errorCallback?: (errorData: {
                error: ApiError;
                query?: Query<unknown, unknown, unknown, readonly unknown[]>;
                mutation?: Mutation<unknown, unknown, unknown, unknown>;
            }) => void;
            extendHeaders?: (headers: AxiosRequestHeaders) => AxiosRequestHeaders;
            unhandledErrorCallback?: () => void;
            customAuthorizationHeader?: (token: string) => string;
            queryClientOptions?: QueryClientConfig;
            mutationCacheOptions?: MutationCache["config"];
            queryCacheOptions?: QueryCache["config"];
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
