// import js from "@eslint/js";
// import globals from "globals";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
// ]);
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 通用配置：应用 JS 推荐规则
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"] 
  },
  
  // 前端/浏览器环境配置（假设非 .js 结尾或特定目录为前端代码，根据实际情况调整 files 匹配）
  { 
    files: ["**/*.{mjs,cjs}"], // 或者前端特定目录，如 "src/**/*.{js,mjs}"
    languageOptions: { 
      globals: globals.browser 
    } 
  },

  // Node.js/CommonJS 环境配置
  { 
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs",
      globals: globals.node // 添加 Node.js 全局变量支持
    } 
  },
]);