import http from 'http';
import app from '../server/server';

const port = +process.env.PORT || 3000;
app.set('port', port);

http.createServer(app).listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
export default app; 

