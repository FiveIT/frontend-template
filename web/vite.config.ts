// vite.config.js
import { defineConfig } from 'vite'
// import { minify } from 'html-minifier'
import path from 'path'
import preprocess from 'svelte-preprocess'
import svelte from '@svitejs/vite-plugin-svelte'
// const { defineConfig } = require("vite");
import windiCSS from 'vite-plugin-windicss'

// const indexReplace = () => {
//   return {
//     name: 'html-transform',
//     transformIndexHtml(html) {
//       return minify(html, {
//         collapseWhitespace: true,
//       })
//     },
//   }
// }

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  return {
    extensions: ['ts', 'tsx', 'html', 'js', 'css', 'svg', 'json'],
    optimizeDeps: {
      exclude: ['@roxi/routify'],
    },
    define: {
      'import.meta.env.FUNCTIONS_URL': JSON.stringify(
        process.env.FUNCTIONS_URL
      ),
    },
    resolve: {
      alias: {
        svelte: path.resolve(process.cwd(), 'node_modules/svelte'),
        $: path.resolve(process.cwd(), 'src'),
      },
    },
    plugins: [
      windiCSS.default({
        //@ts-ignore
        verbose: true,
        silent: false,
        debug: true,
        config: 'tailwind.config.cjs', // tailwind config file path (optional)
        compile: false, // false: interpretation mode; true: compilation mode
        prefix: 'css-', // set compilation mode style prefix
        globalPreflight: true, // set preflight style is global or scoped
        globalUtility: true, // set utility style is global or scoped
      }),
      svelte({
        //@ts-ignore
        hot: !isProduction,
        compilerOptions: {
          dev: !isProduction,
        },
        emitCss: true,
        preprocess: preprocess(),
      }),
      //indexReplace(),
    ],
    build: {
      minify: isProduction,
    },
  }
})
