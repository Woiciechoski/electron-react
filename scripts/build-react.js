const fs = require('fs');
const fse = require('fs-extra');
const { exec, spawn } = require('child_process');

const path = require('path');
const rootDir = path.resolve('./');
const react_build_path = path.normalize(`${rootDir}/build`);
const terminal = spawn('bash');

fs.readdir(react_build_path, (err, files) => {
    if (err) {
        return;
    } else {
        fse.remove(react_build_path, (err) => {
            if (err) console.log(err);
        })
    }
});

terminal.stdout.on('data', data => {
    console.log(data.toString());
});

terminal.stdin.write('cd app\n');
terminal.stdin.write('npm run build\n');
terminal.stdin.write('mv build/ ../\n');
terminal.stdin.end();