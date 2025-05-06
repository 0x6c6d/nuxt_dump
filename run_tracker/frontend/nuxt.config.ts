import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/app.css"],
  runtimeConfig: {
    public: {
      pocketbaseUrl: process.env.POCKETBASE_URL || "http://localhost:8090",
    },
  },
});
