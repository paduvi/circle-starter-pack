/**
 * Created by chotoxautinh on 12/27/16.
 */
import path from 'path';

module.exports = (app) => {

    const notFoundHandler = (req, res) => {
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.status(404).jsonp({error: "Sorry can't find that!"})
        } else {
            res.sendFile(path.resolve(__dirname, '../static/404.html'));
        }
    }

    const logErrors = (err, req, res, next) => {
        app.logger.error(err.stack || err)
        next(err)
    }

    const clientErrorHandler = (err, req, res, next) => {
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            res.status(500).jsonp({error: 'Something failed!'})
        } else {
            next(err)
        }
    }

    const errorHandler = (err, req, res, next) => {
        res.sendFile(path.resolve(__dirname, '../static/500.html'));
    }

    app.use(notFoundHandler);
    app.use(logErrors)
    app.use(clientErrorHandler)
    app.use(errorHandler)
}