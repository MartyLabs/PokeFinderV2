import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/blocks",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
    "@storybook/addon-mdx-gfm",
    "@storybook/addon-webpack5-compiler-swc",
  ],

  staticDirs: ["../public"],

  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "@": path.resolve(__dirname, "../src"),
      };
    }
    return config;
  },

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {
    autodocs: true,
  },
};

export default config;
