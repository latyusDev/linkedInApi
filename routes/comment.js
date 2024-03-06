const express = require('express');
const { commentPost,replyComment, getCommentReplies} = require('../controllers/commentController');
const { likeComment } = require('../controllers/likeController');
const commentRoute = express.Router();

commentRoute.route('/:id').post(commentPost);//comment a post
commentRoute.route('/:postId/comment/:commentId').get(getCommentReplies)//all nested comments 
                                                 .post(replyComment);//reply a comment
commentRoute.route('/:postId/comment/:commentId/like').post(likeComment)

module.exports = commentRoute;