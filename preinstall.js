const fs = require('fs');

if (!fs.existsSync('hooks')) {
    fs.mkdirSync('hooks');
}

if (!fs.existsSync('hooks/before-prepare')) {
    fs.mkdirSync('hooks/before-prepare');
}

fs.copyFileSync('../tools/setup.js', 'hooks/before-prepare/setup.js');