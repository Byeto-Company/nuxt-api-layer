import axiosOriginal from "axios";

export default defineNuxtPlugin({
    name: "axios",
    setup: () => {
        const config = useRuntimeConfig();
        const { token } = useAuth();

        const axios = axiosOriginal.create({
            baseURL: config.public.API_BASE_URL,
        });

        axios.interceptors.request.use((config) => {
            if (config.authorization) {
                config.headers.Authorization = token.value ? `Bearer ${token.value}` : undefined;
            }

            return config;
        });

        axios.interceptors.response.use(
            (response) => {
                return response;
            },
            async function (error: ApiError) {
                if (process.env.NODE_ENV === 'development') {
                    console.log(
                        `[ AXIOS_ERROR ] - [ ${error.response?.config.url} ] - [${error.status}] \n`,
                        error.response?.data
                    );
                }
                return Promise.reject(error);
            }
        );

        return {
            provide: {
                axios,
            },
        };
    },
});
