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
