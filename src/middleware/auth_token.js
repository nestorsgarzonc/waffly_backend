import jwt from 'jsonwebtoken'

exports.checkToken = (req, res, next) => {
    let token = req.get('token')
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({ ok: false, message: 'Token no valido', err })
        }
        req.usuario = decoded.user
        next()
    })
}