const http = require('http');
const app = require('../server/server.js');

const port = +process.env.PORT || 3000;
app.set('port', port);

http.createServer(app).listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});