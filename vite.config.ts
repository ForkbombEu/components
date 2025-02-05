import { defineConfig } from "vite";

export default defineConfig({
  // The base URL should match your GitHub repository name
  // If your repo is "my-repo", the base would be "/my-repo/"
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
    : "/",
});
