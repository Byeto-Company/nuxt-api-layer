import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
    extends: ["github:Byeto-Company/nuxt-utils-layer", "github:Byeto-Company/nuxt-auth-layer", ".."],
    modules: ["@nuxt/eslint"],
    eslint: {
        config: {
            // Use the generated ESLint config for lint root project as well
            rootDir: fileURLToPath(new URL("..", import.meta.url)),
        },
    },
});
