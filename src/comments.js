const Router = require('koa-router');
const r = new Router();

var db = require('./db');

exports.router = r;

exports.getForVideo = function (videoIdParamName) {
    return async (ctx, next) => {
        var videoId = ctx.params[videoIdParamName];
        var vid = await db.Video.where({id: videoId}).fetch({withRelated: ['comments']});
        if (vid)
            ctx.body = {
                totalRecords: vid.related('comments').length,
                comments: vid.related('comments') || []
            };
        else
            ctx.status = 404;
    };
};

exports.createForVideo = function (videoIdParamName) {
    return async (ctx, next) => {
        var videoId = ctx.params[videoIdParamName];
        if (typeof ctx.request.body.content !== "string") {
            ctx.status = 400;
            return;
        }

        var vid = await db.Video.where({id: videoId}).fetch();
        if (vid) {
            await new db.Comment({videoId: videoId, content: ctx.request.body.content, user: 'dummyuser'}).save();
            ctx.status = 201;
        }
        else
            ctx.status = 404;
    };
};

exports.getForUser = function (userIdParamName) {
    return async (ctx, next) => {
        var userId = ctx.params[userIdParamName];
        // TODO: implement
    };
};

r.delete('/:id', async (ctx, next) => {
    var toDelete = new db.Comment({id: ctx.params.id});
    await toDelete.destroy();
    ctx.status = 200;
});
