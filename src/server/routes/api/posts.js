import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'

const router = express.Router()
import { Post } from '../../models/Post'
import { Profile } from '../../models/Profile'
import { validatePostInput } from '../../validation/post'

/**
 * @route - GET api/posts/test
 * @desc - tests posts route
 * @access - public
 */
router.get('/test', (req, res) => res.json({ msg: 'POSTS works!' }))

/**
 * @route - POST api/posts/
 * @desc - Create post
 * @access - private
 */
router.post('/', passport.authenticate('jwt', { session: false }), ({ body: request, user }, res) => {

  const { errors, isValid } = validatePostInput(request)
  if (!isValid) return res.status(400).json(errors)
  const { text, name, avatar } = request

  const newPost = new Post({ text, name, avatar, user: user.id })

  newPost.save().then(post => res.json(post))
})

/**
 * @route - GET api/posts/
 * @desc - get posts
 * @access - public
 */
router.get('/', ({ body: request, user }, res) => {

  Post.find().sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(errors => res.status(404).json({ nopostsfound: 'No posts found for this ID' }))
})

/**
 * @route - GET api/posts/:id
 * @desc - get post
 * @access - public
 */
router.get('/:id', ({ params: request, user }, res) => {

  Post.findById(request.id)
      .sort({ date: -1 })
      .then(post => res.json(post))
      .catch(errors => res.status(404).json({ nopostfound: 'No post found for this ID' }))
})

/**
 * @route - DELETE api/posts/:id
 * @desc - delete post
 * @access - private
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), ({ params, body: request, user }, res) => {

  Profile.findOne({ user: user.id })
         .then(profile => {
           Post.findById(params.id)
               .then(post => {
                 // if user is not a owner of this post
                 if (post.user.toString() !== user.id) return res.status(401).json({ notauthorized: 'User not authorized' })
                 // delete post
                 post
                   .remove()
                   .then(() => res.json({ success: true }))
               })
               .catch(error => res.status(404).json({ postnotfound: 'No post found' }))

         })
})

/**
 * @route - POST api/posts/like/:id
 * @desc - like post
 * @access - private
 */
router.post('/like/:id', passport.authenticate('jwt', { session: false }), ({ params, body: request, user }, res) => {

  Profile.findOne({ user: user.id })
         .then(profile => {
           Post.findById(params.id)
               .then(post => {
                 if (post.likes.find(like => like.user.toString() === user.id)) return res.status(400).json({ alreadyliked: 'User is already liked this post' })
                 post.likes.unshift({ user: user.id })
                 post.save().then(post => res.json(post))

               })
               .catch(error => res.status(404).json({ postnotfound: 'No post found' }))
         })
})

/**
 * @route - POST api/posts/unlike/:id
 * @desc - unlike post
 * @access - private
 */
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), ({ params, body: request, user }, res) => {

  Profile.findOne({ user: user.id })
         .then(profile => {
           Post.findById(params.id)
               .then(post => {
                 const likeIndex = post.likes.findIndex(like => like.user.toString() === user.id)
                 if (likeIndex === -1) return res.status(400).json({ notalreadyliked: 'User is not already liked this post' })
                 post.likes.splice(likeIndex, 1)
                 post.save().then(post => res.json(post))
               })
               .catch(error => res.status(404).json({ postnotfound: 'No post found' }))
         })
})

export default router