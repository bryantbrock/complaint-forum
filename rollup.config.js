import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;

const aliases = alias({
  resolve: ['.svelte', '.js'],
  entries: [
    { find: 'components', replacement: 'src/components' },
    { find: 'styles', replacement: 'src/styles' },
    { find: 'util', replacement: 'src/util' },
    { find: 'partials', replacement: 'src/partials' },
    { find: 'pages', replacement: 'src/pages' },
  ]
});

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    aliases,
    svelte({
      preprocess: sveltePreprocess({ postcss: true }),
      compilerOptions: {
        dev: !production,
      },
    }),
    json(),
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
