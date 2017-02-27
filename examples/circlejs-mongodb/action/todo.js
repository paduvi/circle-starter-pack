const _ = require('lodash');
const uuid = require('uuid');

module.exports = (app) => {
    const Todo = app.db.mongo.models.Todo;
    return {
        findTodo: ({offset, limit, author}, done) => {
            Todo.find({author})
                .limit(limit)
                .skip(offset)
                .then(results =>
                    done(null, results)
                )
                .catch(err => done(null));
        }
        ,
        findTodoById: ({id}, done) =>
            Todo.find({_id: id})
                .then(result =>
                    done(null, result[0])
                )
                .catch(err =>
                    done(null)
                )
        ,
        createTodo: ({payload}, done) => {
            const newTodo = new Todo({...payload});
            newTodo.save(err =>
                done(null, newTodo)
            )
        },
        updateTodo: ({id, payload, author}, done) => {
            Todo.find({_id: id})
                .then(result => {
                    if (result[0].author != author)
                        return done(null);
                    return Todo.update({_id: id}, {...payload})
                        .then(updated =>
                            done(null, {
                                _id: id,
                                ...payload
                            })
                        );
                })
                .catch(err =>
                    done(null)
                )
        },
        deleteTodo: ({id, author}, done) =>
            Todo.find({_id: id})
                .then(result => {
                    if (result[0].author !== author)
                        return done(null);
                    return Todo.remove({_id: id})
                    .then(removed =>
                        done(null, result[0])
                    )
                })
                .catch(err =>
                    done(null)
                )
    }
}