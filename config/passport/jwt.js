/**
 * Created by chotoxautinh on 2/8/17.
 */
const passportJWT = require("passport-jwt");
const _ = require('lodash');

const users = [
    {
        id: 1,
        username: 'paduvi',
        password: '123456',
        permissions: ['fashion_manage_all', 'test']
    }, {
        id: 2,
        username: 'chotoxautinh',
        password: '123456',
        permissions: ['test']
    }
]

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.versionOneCompatibility({authScheme: 'Bearer'});
jwtOptions.secretOrKey = 'a corgi dog';

module.exports = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    let id = jwt_payload.id;

    const user = _.find(users, {id});
    if (!user)
        return next('User not found');
    return next(null, user);
});