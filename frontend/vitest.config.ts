import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "dist", "e2e"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      include: [
        "src/shared/api/core/**/*.{ts,tsx}",
        "src/shared/api/auth/**/*.{ts,tsx}",
        "src/shared/utils/**/*.{ts,tsx}",

        "src/entities/topic/api/buildTopicFormData.ts",

        "src/features/auth-by-credentials/model/schema.ts",
        "src/features/button-create-student/model/schema.ts",
        "src/features/button-create-teacher/model/schema.ts",
        "src/features/edit-student/model/schema.ts",
        "src/features/edit-teacher/model/schema.ts",

        "src/features/create-topic/model/useCreateTopicMutation.ts",
      ],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.spec.{ts,tsx}",
        "src/**/*.d.ts",
        "src/**/index.ts",
      ],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70,
      },
    },
  },
});
