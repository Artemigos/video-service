const Router = require('koa-router');
const r = new Router();

var comments = require('./comments');

var db = require('./db');

r.get('/', async (ctx, next) => {
    var videos = await db.Video.fetchAll();
    ctx.body = {totalRecords: videos.length, videos: videos};
});

r.post('/', async (ctx, next) => {
    // TODO: handle data stream
    var video = ctx.request.body;
    if (typeof video.title !== "string" || typeof video.description !== "string") {
        ctx.status = 400;
        return;
    }

    await new db.Video({title: video.title, description: video.description, user: 'dummyuser'}).save();
    ctx.status = 201;
});

r.get('/:id', async (ctx, next) => {
    var vid = await db.Video.where({id: ctx.params.id}).fetch();
    if (vid)
        ctx.body = vid;
    else
        ctx.status = 404;
});

r.get('/:id/stream', async (ctx, next) => {
    // TODO: stream video
});

r.delete('/:id', async (ctx, next) => {
    var toDelete = new db.Video({id: ctx.params.id});
    await toDelete.destroy();
    ctx.status = 200;
});

// comments routes
r.get('/:id/comments', comments.getForVideo('id'));
r.post('/:id/comments', comments.createForVideo('id'));

module.exports = r;