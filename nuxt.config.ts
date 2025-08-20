// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    extends: ["github:Byeto-Company/nuxt-auth-layer"],
    modules: ["@nuxt/eslint"],
});
