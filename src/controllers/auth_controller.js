import User from '../models/User'
import bcrypt from 'bcrypt'
//import _ from 'underscore'
import jwt from 'jsonwebtoken'

exports.userLogin = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(404).json({ ok: false, message: 'Error ', err })
        } else if (!user) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado', err })
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(404).json({ ok: false, message: 'Usuario o contraseña incorrecta', err })
        }
        let token = jwt.sign({ user }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })
        res.json({ ok: true, user, token })
    })
}

exports.userSignUp = async (req, res) => {
    let user = User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        location: req.body.location,
        document: req.body.document,
        gender: req.body.gender,
        img: req.body.img
    })
    user.save((err, new_user) => {
        if (err) {
            return res.status(400).json({ ok: false, message: err })
        }
        res.json({ ok: true, message: 'Usuario creado correctamente', ...new_user['_doc'] })
    })
}
