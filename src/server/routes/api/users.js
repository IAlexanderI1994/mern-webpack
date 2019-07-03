import express from 'express'
import { User } from '../../models/User'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import keys from '../../../../config/keys'
import passport from 'passport'
import validateRegisterInput from '../../validation/register'
import validateLoginInput from '../../validation/login'

const router = express.Router()
/**
 * @route - GET api/users/test
 * @desc - tests user route
 * @access - public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users works!' }))

/**
 * @route - POST api/users/register
 * @desc - Login users / Returning JWT Token
 * @access - public
 */

router.post('/register', ({ body: request }, res) => {

  const { errors, isValid } = validateRegisterInput(request)

  if (!isValid) return res.status(400).json(errors)

  User.findOne({ email: request.email }).then(user => {
    if (user) {
      errors.email = 'email already exists'
      return res.status(400).json(errors)
    }
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

/**
 * @route - POST api/users/login
 * @desc - Register user
 * @access - public
 */

router.post('/login', ({ body: request }, res) => {

  const { errors, isValid } = validateLoginInput(request)

  if (!isValid) return res.status(400).json(errors)

  const { email, password } = request
  User.findOne({ email }).then(user => {

    // check for user
    if (!user) return res.status(404).json({ email: 'User not found' })

    // check for password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // create jwt payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar }

        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: 'true', token: 'Bearer ' + token })
        })

      } else {
        return res.status(400).json({ password: 'Password incorrect' })
      }
    })

  })

})

/**
 * @route - GET api/users/current
 * @desc - Return current user
 * @access - private
 */

router.get('/current', passport.authenticate('jwt', { session: false }), ({ user }, res) => {
  const { id, email, name } = user
  res.json({ id, email, name })
})

export default router