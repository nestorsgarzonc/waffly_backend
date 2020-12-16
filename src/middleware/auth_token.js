import jwt from 'jsonwebtoken'

exports.checkUserToken = (req, res, next) => {
    let token = req.get('token')
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({ ok: false, message: 'Token no valido', err })
        }
        if(!decoded.usuario){
            return res.status(400).json({ ok: false, message: 'Permisos no validos', err })
        }
        req.usuario = decoded.user
        next()
    })
}

exports.checkFreelancerToken = (req, res, next) => {
    let token = req.get('token')
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({ ok: false, message: 'Token no valido', err })
        }
        if(!decoded.freelancer){
            return res.status(400).json({ ok: false, message: 'Permisos no validos', err })
        }
        req.freelancer = decoded.freelancer
        next()
    })
}