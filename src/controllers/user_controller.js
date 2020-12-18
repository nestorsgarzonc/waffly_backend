import User from '../models/User'
import {Service} from '../models/Service'
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


export const addToServiceHistory = async (req, res) => {
    let serviceObj = {
        freelancer_id: req.body.freelancer_id,
        service_id: req.body.service_id,
        date: new Date(),
    }
    User.findByIdAndUpdate(
        req.params.id,
        { $push: { services_history: serviceObj } },
        (err, __) => {
            if (err) {
                return res.status(400).json({ ok: false, message: err })
            }
            Service.findByIdAndUpdate(
                serviceObj.service_id,
                { $inc: { num_purchases: 1 } },
                (err_2, ___) => {
                    if (err_2) {
                        return res.status(400).json({ ok: false, message: err_2 })
                    }
                    res.json({ ok: true, message: 'Agregado correctamente' })
                }
            )
        }
    )
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
    User.findByIdAndUpdate(req.params.id, { status: false }, (err, __) => {
        if (err) {
            return res.status(404).json({ ok: false, message: err })
        }
        res.json({ ok: true, message: 'Usuario eliminado correctamente' })
    })
}