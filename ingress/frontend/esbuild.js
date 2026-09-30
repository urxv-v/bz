const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: ['./src/index.tsx'],
  bundle: true,
  outfile: 'public/bundle.js',
  format: 'esm',
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  minify: true,
  sourcemap: true,
  loader: {
    '.js': 'jsx',
    '.tsx': 'tsx',
    '.ts': 'ts',
    '.wasm': 'binary',
    '.css': 'text'
  },
  plugins: [
    {
      name: 'css-inject',
      setup(build) {
        build.onLoad({ filter: /\.css$/ }, async (args) => {
          const contents = await require('fs').promises.readFile(args.path, 'utf8');
          return {
            contents: `
              (() => {
                const style = document.createElement('style');
                style.textContent = ${JSON.stringify(contents)};
                document.head.appendChild(style);
              })();
            `,
            loader: 'js'
          };
        });
      }
    }
  ]
}).catch(() => process.exit(1));
