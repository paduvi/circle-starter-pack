/**
 * Created by hailp on 11/24/16.
 */

const _ = require('lodash');
const uuid = require('uuid');

var samples = [];

module.exports = (app) => {

    return {
        findSample: ({offset, limit}, done) => {
            done(null, samples.slice(offset, offset + limit))
        },

        findSampleById: ({id}, done) => {
            done(null, _.find(samples, {id}));
        },

        createSample: ({payload}, done) => {
            const result = {
                id: uuid.v4(),
                ...payload
            }
            samples.push(result);
            return done(null, result);
        },

        updateSample: ({id, payload}, done) => {
            const sample = _.find(samples, {id});
            if (!sample)
                return done(null);
            const index = _.indexOf(samples, sample);

            // Replace item at index using native splice
            const result = {...sample, ...payload}
            samples.splice(index, 1, result);

            return done(null, result);
        },

        deleteSample: ({id}, done) => {
            done(null, _.remove(samples, (sample) => sample.id === id));
        }
    }
};

