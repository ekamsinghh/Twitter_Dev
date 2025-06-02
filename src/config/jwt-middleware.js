import JWT from 'passport-jwt';
import User from '../model/user.js';
const JwtStrategy= JWT.Strategy;
const ExtractJwt= JWT.ExtractJwt;

const opts={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'twitter_secret',
}

//* Logic to validate token
export const passportAuth = (passport) => {
    try{
        passport.use(new JwtStrategy(opts,async (jwt_payload,done) => {
            const user = User.findById(jwt_payload.id);
            if(!user){
                return done(null,false);
            }
            else{
                return done(null,user);
            }
        }))
    }
    catch(error){
        throw error;
    }
}