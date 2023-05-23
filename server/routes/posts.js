import express from 'express';

import { getPosts, createPost, updatePost } from '../controllers/posts.js'

const router = express.Router();


router.get('/', getPosts);
router.post('/', createPost); // creating a post 
router.patch('/:id', updatePost); // updating existing documents 


export default router;