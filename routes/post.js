const express = require('express');
const postRoutes = express.Router();
const {
    storePost,getPosts,getSinglePost,
    updatePost,deletePost
} = require('../controllers/postController');

postRoutes.route('/').get(getPosts).post(storePost)
postRoutes.route('/:id').get(getSinglePost)
                        .put(updatePost)
                        .delete(deletePost)

module.exports = postRoutes