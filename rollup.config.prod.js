import {terser} from 'rollup-plugin-terser';
import ts from 'rollup-plugin-ts';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

const banner = `/*! NanoPop ${pkg.version} MIT | https://github.com/Simonwep/nanopop */`;

export default {
    input: 'src/NanoPop.ts',
    plugins: [
        ts(),
        terser({
            mangle: {
                keep_classnames: true,
                properties: {
                    regex: /^_/
                }
            }
        }),
        replace({
            VERSION: JSON.stringify(pkg.version),
            preventAssignment: true
        })
    ],
    output: [
        {
            banner,
            file: pkg.main,
            name: 'NanoPop',
            format: 'umd',
            sourcemap: true
        },
        {
            banner,
            file: pkg.module,
            format: 'es',
            sourcemap: true
        }
    ]
};
