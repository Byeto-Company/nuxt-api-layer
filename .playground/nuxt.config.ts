import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
    extends: ["@byeto/nuxt-utils-layer", "@byeto/nuxt-auth-layer", ".."],
    modules: ["@nuxt/eslint"],
    authModule: {
        internalPage: true,
        otpCount: 4,
        endpoints: {
            develop_token: {
                name: "",
                path: "/user/develop_token",
            },
            logout: {
                name: "",
                path: "/user/logout",
            },
            otp: {
                name: "",
                path: "/user/send_otp",
            },
            profile: {
                name: "",
                path: "/user/profile",
            },
            refresh: {
                name: "",
                path: "/user/token/refresh",
            },
            signin: {
                name: "",
                path: "/user/token",
            },
            update: {
                name: "",
                path: "/user/profile",
            },
            verify: {
                name: "",
                path: "/user/verify",
            },
        },
    },
    eslint: {
        config: {
            // Use the generated ESLint config for lint root project as well
            rootDir: fileURLToPath(new URL("..", import.meta.url)),
        },
    },
});
