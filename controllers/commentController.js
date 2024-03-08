const Comment = require('../models/Comment');
const Post = require('../models/Post');

const commentPost = async(req,res)=>{
    const {content} = req.body;
    const postId = req.params.id;
    if(!postId){
        return res.status(400).json({message:'post not found'})
    }
    const post = await Post.findById(postId);
    const comment = await Comment.create({user:req.user._id,post:postId,content});
    post.comments.push(comment._id);
    await post.save();
    return res.status(201).json({comment});
}

const replyComment = async(req,res)=>{
    const {content} = req.body;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    if(!postId){
        return res.status(400).json({message:'post not found'})
    }
    const post = await Post.findById(postId);
    const comment = await Comment.create({parent_id:commentId,user:req.user._id,post:postId,content});
    post.comments.push(comment._id);
    await post.save();
    return res.status(201).json({comment});
}

const getCommentReplies = async(req,res)=>{
    const commentId = req.params.commentId;
    if(!commentId){
        return res.status(400).json({message:'replies not found'})
    }
    const comment = await Comment.find({parent_id:commentId});
    return res.status(201).json({comment});
}

module.exports = {commentPost,replyComment,getCommentReplies}