import express from 'express';
import generateShortID from './id_Generate';
import shorttoFullURL from './shortToFullURL';
import onClickCount from './countClicks';
import table from './contentTable';
import cookie from './cookieValidation';
import fbserver from './fbServer';
import { redisDB } from './redisDB';
import validID from './validID';

const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.static('public'));
// app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/generateShortID', cookie, generateShortID);
app.get('/tablegenerate', cookie, table);
app.get('/usertoken', fbserver);
app.get('/:shortId', validID, onClickCount, redisDB, shorttoFullURL);

app.listen(5000);
