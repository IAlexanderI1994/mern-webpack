import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { User } from '../src/server/models/User'
import keys from './keys'

//const User = mongoose.model('users')
const options = {}

options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey    = keys.secretOrKey
export default password => {
  password.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload.id)
        .then(user => user ? done(null, user) : done(null, false))
        .catch(error => console.log(error))
  }))
}

