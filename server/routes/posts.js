import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'

const router = express.Router();


router.get('/', getPosts);
router.post('/', createPost); // creating a post 
router.patch('/:id', updatePost); // updating existing documents 
router.delete('/:id', deletePost); // delete post
router.patch('/:id/likePost', likePost) // like a post


export default router;