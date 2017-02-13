/**
 * Created by chotoxautinh on 11/12/16.
 */

/* Load Database connections */
exports.beforeInitialize = (app) => {
    const models = {
        // postgres: sequelize,
        // mongo: mongoose
    };
    return Promise.resolve().then(() => models);
};

/* Do something after loading models */
exports.afterInitialize = (app) => {
    return Promise.resolve();
}