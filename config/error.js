/**
 * Created by chotoxautinh on 12/27/16.
 */
module.exports = (app) => {

    const logErrors = (err, req, res, next) => {
        app.logger.error(err.stack)
        next(err)
    }

    const clientErrorHandler = (err, req, res, next) => {
        if (req.xhr) {
            res.status(500).send({error: 'Something failed!'})
        } else {
            next(err)
        }
    }

    const errorHandler = (err, req, res) => {
        /* render HTML error page
         res.status(500)
         res.render('error', { error: err })
         */

        res.status(500).send({error: 'Something failed!'})
    }

    app.use(logErrors)
    app.use(clientErrorHandler)
    app.use(errorHandler)
}