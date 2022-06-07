const db = require('../../data/config');

function getPosts() {
    return db('blog');
}

function getPost(title) {
    return db('blog').where({ title }).first()
}

function addPost(data) {
    return db('blog')
        .insert(data, 'id');
}

module.exports = {
    getPosts,
    getPost,
    addPost
}