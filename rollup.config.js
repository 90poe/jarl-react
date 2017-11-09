import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json";

const plugins = [
    babel(babelrc({ path: ".babelrc.rollup.json", addModuleOptions: false }))
];

const modules = ["index", "redux/index"];

export default modules
    .map(name =>
        // browser-friendly UMD build
        ({
            entry: `source/${name}.js`,
            dest: `dist/${name}.umd.js`,
            format: "umd",
            moduleName: name,
            external: ["react", "prop-types"],
            globals: {
                react: "React",
                "prop-types": "PropTypes"
            },
            plugins: plugins.concat([commonjs(), resolve()])
        })
    )
    .concat(
        modules.map(name =>
            // CommonJS (for Node) and ES module (for bundlers) build.
            // (We could have three entries in the configuration array
            // instead of two, but it's quicker to generate multiple
            // builds from a single configuration where possible, using
            // the `targets` option which can specify `dest` and `format`)
            ({
                entry: `source/${name}.js`,
                external: ["react", "prop-types", "url-pattern"],
                targets: [
                    { dest: `dist/${name}.cjs.js`, format: "cjs" },
                    { dest: `dist/${name}.mjs`, format: "es" }
                ],
                plugins
            })
        )
    );
