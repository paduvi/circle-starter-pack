/**
 * Created by chotoxautinh on 12/27/16.
 */
import path from 'path';

module.exports = (app) => {

    const notFoundHandler = (req, res) => {
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.status(404).jsonp({message: "Sorry can't find that!"})
        } else {
            res.sendFile(path.resolve(__dirname, '../static/404.html'));
        }
    }

    const logErrors = (err, req, res, next) => {
        if (!err.status || err.status === 500){
            app.logger.error(err.stack || err);
        }
        next(err)
    }

    const clientErrorHandler = (err, req, res, next) => {
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            if (err.status) {
                return res.status(err.status).jsonp(err);
            }
            return res.status(err).jsonp({message: 'Something failed!'})
        }
        return next(err)
    }

    const errorHandler = (err, req, res, next) => {
        res.sendFile(path.resolve(__dirname, '../static/500.html'));
    }

    app.use(notFoundHandler);
    app.use(logErrors)
    app.use(clientErrorHandler)
    app.use(errorHandler)
}