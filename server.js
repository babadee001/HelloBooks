import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import webpack from 'webpack';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';
import UserRouter from './server/routes/users';
import BookRouter from './server/routes/books';
import webpackConfig from './webpack.config';

dotenv.load();
const app = express();

app.use(logger('dev'));
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/books', BookRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});
app.get('/api', (req, res) => {
  res.header(200);
  res.send('Welcome to Hello-Books API');
});

const port = process.env.PORT || 8000;
// app.set('port', port);

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});
export default app;
