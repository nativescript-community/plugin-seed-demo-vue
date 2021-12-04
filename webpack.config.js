const webpack = require('@nativescript/webpack');
const fs = require('fs');
const { resolve } = require('path');

module.exports = (env) => {
    if (fs.existsSync('../demo-snippets/assets')) {
        webpack.Utils.addCopyRule({
            from: '../demo-snippets/assets',
            to: '.'
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

    webpack.chainWebpack((config) => {
        config.resolve.modules.add(resolve(__dirname, '../demo-snippets/node_modules'));
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
