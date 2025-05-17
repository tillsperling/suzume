// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxtjs/google-fonts', '@pinia/nuxt', '@nuxt/ui'],
    googleFonts: {
        families: {
            Timmana: [400],
            'Source Code Pro': [400, 500, 600],
        },
    },
    runtimeConfig: {
        public: {
            backendUrl: process.env.BACKEND_URL,
        },
    },
    css: ['~/assets/css/main.css'],
});
