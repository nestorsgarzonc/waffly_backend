import User from '../models/User'
import bcrypt from 'bcrypt'
import _ from 'underscore'

export const findAllUsers = async (__, res) => {
    User.find()
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({ ok: false, message: err })
            }
            res.json({ ok: true, ...users })
        });
}

export const findUserById = async (req, res) => {
    User.findById(req.params.id)
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({ ok: false, message: err })
            }
            res.json({ ok: true, ...user['_doc'] })
        });
}

export const postUser = async (req, res) => {
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

export const updateUser = async (req, res) => {
    let body = _.pick(req.body, ['first_name', 'last_name', 'email', 'img', 'status', 'location', 'gender', 'username'])
    User.findByIdAndUpdate(req.params.id, body, (err, __) => {
        if (err) {
            return res.status(400).json({ ok: false, message: err })
        }
        res.json({ ok: true, message: 'Usuario actualizado correctamente' })
    })
}

export const deleteUser = async (req, res) => {
    User.findByIdAndUpdate(req.params.id, { status: false }, (err, deletedUser) => {
        if (err) {
            return res.status(404).json({ ok: false, message: err })
        }
        res.json({ ok: true, message: 'Usuario eliminado correctamente', ...deletedUser['_doc'] })
    })
}