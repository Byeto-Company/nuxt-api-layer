import axiosOriginal from "axios";

export default defineNuxtPlugin({
    name: "axios",
    setup: () => {
        const config = useRuntimeConfig();
        const appConfig = useAppConfig();
        const { token } = useAuth();

        const axios = axiosOriginal.create({
            baseURL: config.public.API_BASE_URL,
        });

        axios.interceptors.request.use((config) => {
            if (appConfig.appApi?.extendHeaders) {
                config.headers = appConfig.appApi.extendHeaders(config.headers);
            }

            if (config.authorization && token.value) {
                if (appConfig.appApi?.customAuthorizationHeader) {
                    appConfig.appApi.customAuthorizationHeader(token.value);
                } else {
                    config.headers.Authorization = `Bearer ${token.value}`;
                }
            }

            return config;
        });

        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            // async function (error: ApiError) {
            //     if (process.env.NODE_ENV === "development") {
            //     }
            //     return Promise.reject(error);
            // }
        );

        return {
            provide: {
                axios,
            },
        };
    },
});
