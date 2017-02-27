const { ExtractJwt, Strategy } = require("passport-jwt");
const _ = require('lodash');

module.exports = (app) => {
    const jwtOptions = {
        jwtFromRequest : ExtractJwt.versionOneCompatibility({authScheme: 'Bearer'}),
        secretOrKey : app.config.secret
    };
    return new Strategy(jwtOptions, (jwt_payload, next) => {
        const User = app.db.mongo.models.User;
        let _id = jwt_payload._id;
        User.find({_id})
            .then(result => {
                if (!result || result.length === 0) return next('User not found');
                return next(null, result[0]);
            })
            .catch(err =>
                next(err)
            );
    })
};