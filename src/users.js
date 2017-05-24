const Router = require('koa-router');
const r = new Router();

var comments = require('./comments');

r.get('/:id/videos', async (ctx, next) => {
    // TODO: implement
});

r.get('/:id/comments', comments.getForUser('id'));

module.exports = r;