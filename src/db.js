var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './data/db.sqlite'
    }
});

var bs = require('bookshelf')(knex);

var Comment = bs.Model.extend({
    tableName: 'Comment'
});

var Video = bs.Model.extend({
    tableName: 'Video',
    comments: function() {
        return this.hasMany(Comment, 'videoId', 'id');
    }
});

module.exports = {
    Comment: Comment,
    Video: Video
};