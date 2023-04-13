import {defineConfig} from 'vite';
import banner from 'vite-plugin-banner';
import dts from 'vite-plugin-dts';
import {version} from './package.json';

const header = `/*! NanoPop ${version} MIT | https://github.com/Simonwep/nanopop */`;

export default defineConfig({
    plugins: [
        banner(header),
        dts()
    ],

    build: {
        sourcemap: true,
        minify: 'esbuild',
        lib: {
            entry: 'src/index.ts',
            name: 'NanoPop',
            fileName: 'nanopop'
        }
    },

    server: {
        port: 3005,
        proxy: {
            // Required for playwright to detect that the dev-server is running.
            '^/$': {
                target: `http://localhost:3005`,
                rewrite: () => '/tests/_pages/container.html'
            }
        }
    },

    define: {
        'VERSION': JSON.stringify(version)
    }
});
