import express from 'express'

const router = express.Router()

/**
 * @route - GET api/profile/test
 * @desc - tests profile route
 * @access - public
 */
router.get('/test', (req, res) => res.json({ msg: "PROFILE works!" }))
export default router