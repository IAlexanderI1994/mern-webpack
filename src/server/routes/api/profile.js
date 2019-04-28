import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import { Profile } from '../../models/Profile'
import { User } from '../../models/User'
import { validateProfileInput } from '../../validation/profile'
import { validateExperienceInput } from '../../validation/experience'
import { validateEducationInput } from '../../validation/education'

const router = express.Router()

/**
 * @route - GET api/profile/test
 * @desc - tests profile route
 * @access - public
 */
router.get('/test', (req, res) => res.json({ msg: 'PROFILE works!' }))

/**
 * @route - GET api/profile
 * @desc - get current users profile
 * @access - private
 */

router.get('/', passport.authenticate('jwt', { session: false }), ({ user }, res) => {
  const errors = {}
  Profile.findOne({ user: user.id })
         .populate('user', ['name', 'avatar'])
         .then(profile => {
           errors['noprofile'] = 'There is no profile for this user'
           if (!profile) return res.status(404).json(errors)
           res.json(profile)
         })
         .catch(error => res.status(404).json(error))
})

/**
 * @route - GET api/profile/handle/:handle
 * @desc - get profile by handle
 * @access - public
 */

router.get('/handle/:handle', ({ params }, res) => {
  const errors     = {}
  const { handle } = params
  Profile.findOne({ handle })
         .populate('user', ['name', 'avatar'])
         .then(profile => {
           if (!profile) {
             errors.handle = 'There is no profile for this user'
             return res.status(404).json(errors)
           }
           res.json(profile)

         })
         .catch(errors => res.status(404).json(errors))

})

/**
 * @route - GET api/profile/user/:user_id
 * @desc - get profile by user_id
 * @access - public
 */

router.get('/user/:user_id', ({ params }, res) => {
  const errors            = {}
  const { user_id: user } = params
  Profile.findOne({ user })
         .populate('user', ['name', 'avatar'])
         .then(profile => {
           if (!profile) {
             errors.handle = 'There is no profile for this user'
             return res.status(404).json(errors)
           }
           res.json(profile)

         })

         .catch(errors => res.status(404).json({ profile: 'Theres no profile' }))

})
/**
 * @route - GET api/profile/all
 * @desc - get profile by user_id
 * @access - public
 */

router.get('/all', (req, res) => {
  const errors = {}
  Profile.find()
         .populate('user', ['name', 'avatar'])
         .then(profiles => {
           if (!profiles) {
             errors.noprofile = 'There are no profiles'
             return res.status(404).json(errors)
           }
           res.json(profiles)
         })
         .catch(errors => res.status(404).json({ profile: 'There are no profiles' }))

})
/**
 * @route - POST api/profile
 * @desc - create current users profile
 * @access - private
 */

router.post('/', passport.authenticate('jwt', { session: false }), ({ user, body: request }, res) => {
  const { errors, isValid } = validateProfileInput(request)
  if (!isValid) return res.status(400).json(errors)

  const profileFields = { user: user.id }
  const neededFields  = [
    'handle',
    'company',
    'website',
    'location',
    'bio',
    'status',
    'githubusername',
    'skills',
    'youtube',
    'instagram',
    'facebook',
    'linkedin',
    'twitter'
  ]
  const prefixGroups  = {
    social: [
      'youtube',
      'instagram',
      'facebook',
      'linkedin',
      'twitter'
    ]
  }

  const mapping = {
    skills: val => val.split(',').map(val => val.trim())
  }
  neededFields.forEach(field => {
    if (request[field]) {
      // trying to get group prefix if exists
      const prefix = Object.keys(prefixGroups).find(groupName => prefixGroups[groupName].indexOf(field) !== -1)
      // mapping fields if needed
      if (Object.keys(mapping).indexOf(field) !== -1) request[field] = mapping[field](request[field])
      if (prefix) {
        !profileFields[prefix] ?
          Object.assign(profileFields, { [prefix]: { [field]: request[field] } }) :
          Object.assign(profileFields[prefix], { [field]: request[field] })

      } else {
        Object.assign(profileFields, { [field]: request[field] })
      }
    }
  })

  Profile.findOne({ user: user.id })
         .then(profile => {
           if (profile) {
             // update
             Profile.findOneAndUpdate(
               { user: user.id },
               { $set: profileFields },
               { new: true }
             )
                    .then(profile => res.json(profile))

           } else {
             //create
             // Check if handle exists
             Profile.findOne({ handle: profileFields.handle })
                    .then(profile => {
                      if (profile) {
                        errors.handle = 'That handle already exists'
                        res.status(400).json(errors)
                      }
                      // create Profile
                      new Profile(profileFields).save().then(profile => res.json(profile))
                    })
           }
         })

})

/**
 * @route - POST api/profile/experience
 * @desc - add experience to profile
 * @access - private
 */
router.post('/experience', passport.authenticate('jwt', { session: false }), ({ user, body: request }, res) => {
  const { errors, isValid } = validateExperienceInput(request)
  if (!isValid) return res.status(400).json(errors)

  const { title, company, location, from, to, description } = request
  Profile.findOne({ user: user.id })
         .then(profile => {
           if (!profile) {
             errors.profile = 'profile not found'
             return res.status(404).json(errors)
           }
           const current = !to
           const newExp  = {
             title,
             company,
             location,
             from,
             to,
             current,
             description
           }
           profile.experience.unshift(newExp)
           profile.save().then(profile => res.json(profile))

         })
         .catch(errors => res.status(404).json(errors))

})

/**
 * @route - POST api/profile/education
 * @desc - add education to profile
 * @access - private
 */
router.post('/education', passport.authenticate('jwt', { session: false }), ({ user, body: request }, res) => {
  const { errors, isValid } = validateEducationInput(request)
  if (!isValid) return res.status(400).json(errors)

  const { school, degree, fieldofstudy, from, to, description } = request
  Profile.findOne({ user: user.id })
         .then(profile => {
           if (!profile) {
             errors.profile = 'profile not found'
             return res.status(404).json(errors)
           }

           const current = !to
           const newEdu  = {
             school,
             degree,
             fieldofstudy,
             from,
             to,
             current,
             description
           }
           profile.education.unshift(newEdu)
           profile.save()
                  .then(profile => res.json(profile))
             .catch(e => res.status(404).json(errors))

         })
         .catch(errors => res.status(404).json(errors))

})

export default router