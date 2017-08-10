import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import UserRouter from '../server/routes/users';
import BookRouter from '../server/routes/books';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/books', BookRouter);


export default app;

module.exports = app;
