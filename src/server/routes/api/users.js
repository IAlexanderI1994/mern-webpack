import express from 'express'
import { User } from '../../models/User'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'

const router = express.Router()
/**
 * @route - GET api/users/test
 * @desc - tests user route
 * @access - public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users works!' }))

/**
 * @route - POST api/users/register
 * @desc - Register user
 * @access - public
 */

router.post('/register', ({ body: request }, res) => {
  User.findOne({ email: request.email }).then(user => {
    if (user) return res.status(400).json({ email: 'email already exists' })

    const { name, email, password } = request
    const avatar                    = gravatar.url(email, {
      s: 200,
      r: 'pg',
      d: 'mm'
    })
    const newUser                   = new User({ name, email, avatar, password })
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) throw error
        newUser.password = hash
        newUser.save()
               .then(user => res.json(user))
               .catch(error => console.log(error))
      })
    })

  })
})

export default router