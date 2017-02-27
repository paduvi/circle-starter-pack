module.exports = (app) => {
    const User = app.db.mongo.models.User;
    const jwt = require('jwt-simple');
    const secret = app.config.secret;
    return {
        createUser: ({username, password}, done) =>
            User.find({username})
                .then(result => {
                    if (result && result.length > 0 ) return done('Username existed');
                    const newUser = new User({
                        username,
                        password,
                        permissions: ['manage_own_todo']
                    });
                    return newUser.save()
                        .then(result =>
                            done(null, newUser)
                        )
                })
                .catch(err =>
                    done(err)
                )
        ,
        findUser: ({}, done) =>
            User.find({})
                .then(result =>
                    done(null, result)
                )
                .catch(err =>
                    done(err)
                )
        ,
        loginUser: ({username, password}, done) => {
            User.find({username, password})
                .then(results => {
                    if (results && results.length > 0) {
                        let payload = {
                            _id: results[0]._id
                        };
                        const token = jwt.encode(payload, secret);
                        console.log(`hey there`, token);
                        return done(null, token);
                    }
                    return done(null);
                })
                .catch(err => 
                    done(null)
                );
        }
    }
}