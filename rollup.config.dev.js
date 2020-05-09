import replace from '@rollup/plugin-replace';
import ts      from '@wessberg/rollup-plugin-ts';
import pkg     from './package.json';

export default {
    input: 'src/NanoPop.ts',
    plugins: [
        ts({
            transpileOnly: true
        }),
        replace({
            VERSION: JSON.stringify(pkg.version)
        })
    ],
    output: [
        {
            file: pkg.module,
            format: 'es'
        }
    ]
};
