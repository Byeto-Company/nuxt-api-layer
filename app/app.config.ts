import "axios";
import type { AxiosError } from "axios";

export default defineAppConfig({
    apiLayer: {
        name: "Hello from Nuxt layer",
    },
});

declare module "@nuxt/schema" {
    interface AppConfigInput {
        apiLayer?: {
            /** Project name */
            name?: string;
            name2?: number;
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
