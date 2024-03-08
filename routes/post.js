const express = require('express');
const postRoutes = express.Router();
const {
    storePost,getPosts,getSinglePost,
    updatePost,deletePost
} = require('../controllers/postController');
const { likePost } = require('../controllers/likeController');
const uploadFile = require('../middlewares/uploadFileMiddleware');

postRoutes.route('/').get(getPosts).post(uploadFile.single('file'),storePost)
postRoutes.route('/:id').get(getSinglePost)
                        .put(updatePost)
                        .delete(deletePost)
postRoutes.route('/:id/like').post(likePost)


module.exports = postRoutes