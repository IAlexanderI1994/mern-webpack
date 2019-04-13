import express from 'express'

const router = express.Router()
/**
 * @route - GET api/users/test
 * @desc - tests user route
 * @access - public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users works!' }))
export default router