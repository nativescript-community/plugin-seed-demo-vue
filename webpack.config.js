const webpack = require('@nativescript/webpack');
const fs = require('fs');

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
            to: webpack.Utils.project.getProjectRootPath() + '/App_Resources'
        });
    }

    if (fs.existsSync('../demo-snippets/App_Resources/iOS')) {
        webpack.Utils.addCopyRule({
            from: '../demo-snippets/App_Resources/iOS',
            to: webpack.Utils.project.getProjectRootPath() + '/App_Resources'
        });
    }

    webpack.init(env);

    const projectPath = webpack.Utils.project.getProjectRootPath();
    const packagesPath = projectPath.substring(0, projectPath.lastIndexOf('/')) + '/packages';

    fs.readdirSync(packagesPath).forEach(file => {
        const package = require(`${packagesPath}/${file}/package.json`);

        webpack.Utils.addCopyRule({
            from: `${packagesPath}/${file}`,
            to: package.name
        })

        if ('dependencies' in package) {
            for (const dependency of Object.keys(package.dependencies)) {
                console.log(`Copying dependency "${dependency}" to demo`)
                webpack.Utils.addCopyRule({
                    from: `${projectPath.substring(0, projectPath.lastIndexOf('/'))}/node_modules/${dependency}`,
                    to: dependency
                })
            }
        }
    });

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
