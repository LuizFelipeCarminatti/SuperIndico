module.exports.checkCsurfError = (err, req, res, next) => {
    if (err & err.code === 'EBADCSRFTOKEN') {
        return res.send('BAD CSURF')
    }
    next()
}

module.exports.csurfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}