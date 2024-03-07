const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Post = require('../models/Post');

const likePost = async(req,res)=>{
    const postId = req.params.id;
    if(!postId){
        return res.status(400).json({message:'Post not found'});
    }
    const post = await Post.findById(postId);
    const like = await Like.findOne({user:req.user._id,object:postId,onModel:'Post'})
    if(like){
        await Like.deleteOne({_id:like._id});
        post.likes.pull(like._id)
        await post.save();
        return res.status(200).json('like deleted');
    }else{

        const newLike = await Like.create({user:req.user._id,object:postId,onModel:'Post'});
        post.likes.push(newLike._id)
        await post.save();
        return res.status(200).json({newLike})
    }
}


const likeComment = async(req,res)=>{
    const commentId = req.params.commentId;
    if(!commentId){
        return res.status(400).json({message:'Comment not found'});
    }
    const comment = await Comment.findById(commentId);
    const like = await Like.findOne({user:req.user._id,object:commentId,onModel:'Comment'})
    if(like){
        await Like.deleteOne({_id:like._id});
        comment.likes.pull(like._id)
        await comment.save();
        return res.status(200).json('like deleted');
    }else{
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);
        const newLike = await Like.create({user:req.user._id,object:commentId,onModel:'Comment'});
        comment.likes.push(newLike._id)
        await comment.save();
        return res.status(200).json({newLike});

        
    }
}



module.exports = {
    likePost,
    likeComment,
}