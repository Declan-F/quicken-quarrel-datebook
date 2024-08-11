import { definePlugins } from '@gera2ld/plaid-rollup';
import { defineConfig } from 'rollup';
import { babel } from '@rollup/plugin-babel'
import userscript from 'rollup-plugin-userscript'
export default defineConfig(
  Object.entries({
    'wkhanziwriteraddition': 'src/userscript/index.js',
  }).map(([name, entry]) => ({
    input: entry,
    plugins: [
      ...definePlugins({
        esm: true,
        minimize: false,
        postcss: {
          inject: false,
          minimize: true,
        },
        extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
      }),
      babel({ babelHelpers: 'bundled' }),
      userscript()
    ],
    output: {
      format: 'iife',
      file: `dist/${name}.user.js`,
      indent: false,
    },
  })),
);
