const webpack = require('@nativescript/webpack');
const fs = require('fs');
const { resolve } = require('path');

let snippetConfig;
if (fs.existsSync('../demo-snippets/webpack.config.vue.js')) {
    snippetConfig = require('../demo-snippets/webpack.config.vue.js');
}

module.exports = (env) => {
    if (fs.existsSync('../demo-snippets/assets')) {
        webpack.Utils.addCopyRule({
            from: '../demo-snippets/assets',
            to: './assets'
        });
    }
    if (fs.existsSync('../demo-snippets/App_Resources/Android')) {
        webpack.Utils.addCopyRule({
            from: '../demo-snippets/App_Resources/Android',
            to: webpack.Utils.project.getProjectRootPath() + '/App_Resources/Android'
        });
    }

    if (fs.existsSync('../demo-snippets/App_Resources/iOS')) {
        webpack.Utils.addCopyRule({
            from: '../demo-snippets/App_Resources/iOS',
            to: webpack.Utils.project.getProjectRootPath() + '/App_Resources/iOS'
        });
    }
    webpack.init(env);

    const { redirect } = env;

    if (snippetConfig) {
        snippetConfig(env, webpack);
    }

    webpack.chainWebpack((config) => {
        if (env.fork) {
            const coreModulesPackageName = '@akylas/nativescript';
            config.resolve.modules
                .clear()
                .merge([resolve(__dirname, `node_modules/${coreModulesPackageName}`), resolve(__dirname, 'node_modules'), `node_modules/${coreModulesPackageName}`, 'node_modules']);
            config.resolve.alias.merge({
                '@nativescript/core': `${coreModulesPackageName}`,
                'tns-core-modules': `${coreModulesPackageName}`
            });
        }
        config.resolve.modules.prepend(resolve(__dirname, '../demo-snippets/node_modules'));
        config.plugin('DefinePlugin').tap((args) => {
            if (redirect) {
                Object.assign(args[0], {
                    demoRedirect: JSON.stringify(redirect)
                });
            } else {
                Object.assign(args[0], {
                    demoRedirect: JSON.stringify('')
                });
            }
            return args;
        });
    });

    return webpack.resolveConfig();
};
