import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'og12he',
  e2e: {
    baseUrl: "http://localhost:5173",
  },
});
