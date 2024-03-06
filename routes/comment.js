const express = require('express');
const { commentPost,replyComment, getCommentReplies} = require('../controllers/commentController');
const commentRoute = express.Router();

commentRoute.route('/:id').post(commentPost);
commentRoute.route('/:postId/comment/:commentId').get(getCommentReplies).post(replyComment);

module.exports = commentRoute;