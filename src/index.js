const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const r = new Router();

const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const json = require('koa-json');

const videosRouter = require('./videos');
const commentsRouter = require('./comments').router;
const usersRouter = require('./users');

// var videosRouter = require('./videos');
// var commentsRouter = require('./comments').router;
// var usersRouter = require('./users');

app.use(bodyParser());
app.use(logger());
app.use(json());

function use(url, router) {
    r.use(url, router.routes(), router.allowedMethods());
}

use('/videos', videosRouter);
use('/comments', commentsRouter);
use('/users', usersRouter);

app.use(r.routes());

console.log('Listening on port 3000.');
app.listen(3000);
