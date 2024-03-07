const Post = require('../models/Post');

const storePost = async(req,res)=>{
    const {content} = req.body;

    const post = await Post.create({content});
    return res.status(200).json({post})
}

const getPosts = async(req,res)=>{
    // const posts = await Post.find().populate('comments');
    const posts = await Post.find().populate({
        path:'comments', 
        match:{parent_id:null}
    }).populate('likes');
    return res.status(200).json(posts);
}

const getSinglePost = async(req,res)=>{

    const post =  await Post.findById(req.params.id).populate({
        path:'comments',
        match:{parent_id:null}
    }).populate('likes');;
    if(!post){
       return res.status(400).json({message:'post not found'})
    }
    return res.status(200).json(post)

}

const updatePost = async(req,res)=>{

    const post = await Post.findById(req.params.id);
    if(!post){
        return res.status(400).json({message:'post is not found'})
    }
    await Post.findByIdAndUpdate(post._id,req.body,{new:true})
    return res.status(200).json({message:'post is updated successfully'})

}
const deletePost = async(req,res)=>{

    const post = await Post.findById(req.params.id);
    if(!post){
       return res.status(400).json({message:'post not found'})
    }
    await Post.findByIdAndDelete(post._id)
    return res.status(200).json({message:'post is deleted'})

}

module.exports = {
    storePost,
    getPosts,
    getSinglePost,
    updatePost,
    deletePost
}