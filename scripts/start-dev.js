const { exec } = require('child_process');
const http = require('http');
process.env.PROJECT = 'development'
process.env.ELECTRON_START_URL = 'http://localhost:3000'

const react = exec('cd app && npm start')

react.stdout.on('data', data => {
    console.log("REACT: ", data.toString());
});




function tryConnection() {
    const options = {
        host: '127.0.0.1',
        port: 3000,
        path: '/',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`Iniciando electron`);
        res.on('data', (data) => {
            console.log("Evento data");
            const electron = exec('yarn start')
            electron.stdout.on('data', data => {
                console.log("ELECTRON: ", data.toString());
            });
        });
    });


    req.on('error', (err) => {
        setTimeout(tryConnection, 1000)
    });

    req.end();
}

tryConnection()