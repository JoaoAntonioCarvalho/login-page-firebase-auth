const { app } = require('./servers/api/routes.js');
const { pageApp } = require('./servers/page/routes.js');

//initialize server
let apiPort = 2340;
let portPageApp = 2341;

console.log(`Login page: http://127.0.0.1:${portPageApp}/`);
app.listen(apiPort, () => console.log('server running on port ' + apiPort));
pageApp.listen(portPageApp, () => console.log('pageApp running on port ' + portPageApp));
