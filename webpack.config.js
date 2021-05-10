const webpack = require('@nativescript/webpack');

const { DefinePlugin } = require('webpack');

module.exports = (env) => {
    webpack.init(env);

    const { redirect } = env;

    webpack.chainWebpack((config) => {
        config.plugin('DefinePlugin').tap((args) => {
            if (redirect) {
                Object.assign(args[0], {
                    demoRedirect: JSON.stringify(redirect)
                });
            } else {
                Object.assign(args[0], {
                    demoRedirect: JSON.stringify("")
                });
            }
            return args;
        });
    });

    return webpack.resolveConfig();
};
