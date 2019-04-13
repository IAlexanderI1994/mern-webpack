import express from 'express'

const router = express.Router()
/**
 * @route - GET api/posts/test
 * @desc - tests posts route
 * @access - public
 */
router.get('/test', (req, res) => res.json({ msg: "POSTS works!" }))
export default router