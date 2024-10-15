const JWT = require('jsonwebtoken')

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

module.exports.privada = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' })
    }

    try {
        const decoded = JWT.verify(token, process.env.SECRET_TOKEN)

        res.userID = decoded.id

        next()
    } catch (error) {

        console.log(error.message)

        res.status(400).json({ msg: 'Token inválido' })
    }
}