import type { DehydratedState, VueQueryPluginOptions } from "@tanstack/vue-query";
import { VueQueryPlugin, QueryClient, hydrate, dehydrate, QueryCache, MutationCache } from "@tanstack/vue-query";

import { defineNuxtPlugin, useState } from "#imports";
import { AxiosError } from "axios";

export default defineNuxtPlugin({
    enforce: "pre",
    setup: (nuxt) => {
        const toast = useToast();

        const vueQueryState = useState<DehydratedState | null>("vue-query");

        const flattenErrors = (err: ApiError) => {
            const errorTexts: string[] = [];

            const flattenFn = (err: ApiError) => {
                const errorResponse = err.response!.data;

                for (const key in errorResponse) {
                    for (const errorItem of errorResponse[key]) {
                        if (typeof errorItem === "string") errorTexts.push(errorItem);
                        else {
                            flattenFn(errorItem);
                        }
                    }
                }
            };

            flattenFn(err);

            return errorTexts;
        };

        const errorHandler = (error: ApiError) => {
            if (import.meta.client && error instanceof AxiosError) {
                if (error.status && error.status >= 400 && error.status <= 499) {
                    const errorsText = flattenErrors(error);

                    toast.add({
                        color: "error",
                        title:
                            process.env.NODE_ENV !== "development"
                                ? ` خطا : ${error.status} - ${error.code} - ${error.cause}`
                                : "لطفا توجه کنید !",
                        description: errorsText.join("\n"),
                        icon: "fa-duo:circle-exclamation",
                    });
                } else {
                    toast.add({
                        color: "error",
                        title: "مشکلی پیش آمده",
                        description: "خطایی سمت سرور رخ داده است لطفا بعدا تلاش کنید",
                        icon: "fa-duo:circle-exclamation",
                    });
                }
            }
        };

        const queryClient = new QueryClient({
            defaultOptions: { queries: { staleTime: 5000 } },
            queryCache: new QueryCache({
                onError: (error, query) => {
                    if (query.meta?.handleError) errorHandler(error as ApiError);
                },
            }),
            mutationCache: new MutationCache({
                onError: (error, _variables, _context, mutation) => {
                    if (mutation.meta?.handleError) errorHandler(error as ApiError);
                },
            }),
        });
        const options: VueQueryPluginOptions = { queryClient };

        nuxt.vueApp.use(VueQueryPlugin, options);

        if (import.meta.server) {
            nuxt.hooks.hook("app:rendered", () => {
                vueQueryState.value = dehydrate(queryClient);
            });
        }

        if (import.meta.client) {
            hydrate(queryClient, vueQueryState.value);
        }

        return {
            provide: {
                queryClient,
            },
        };
    },
});
