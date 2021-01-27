/* eslint-disable no-unused-vars */
import _ from 'underscore';
import User from '../models/User';
// eslint-disable-next-line import/named
import { Service } from '../models/Service';

export const findAllUsers = async (__, res) => {
    User.find()
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({ ok: false, message: err });
            }
            return res.json({ ok: true, ...users });
        });
};

export const findUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.json({ ok: true, user });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error });
    }
};

export const addToServiceHistory = async (req, res) => {
    const serviceObj = {
        freelancer_id: req.body.freelancer_id,
        service_id: req.body.service_id,
        date: new Date(),
    };
    User.findByIdAndUpdate(
        req.params.id,
        { $push: { services_history: serviceObj } },
        (err, __) => {
            if (err) {
                return res.status(400).json({ ok: false, message: err });
            }
            return Service.findByIdAndUpdate(
                serviceObj.service_id,
                { $inc: { num_purchases: 1 } },
                (err2, ___) => {
                    if (err2) {
                        return res.status(400).json({ ok: false, message: err2 });
                    }
                    return res.json({ ok: true, message: 'Agregado correctamente' });
                },
            );
        },
    );
};

export const updateUser = async (req, res) => {
    const body = _.pick(req.body, ['first_name', 'last_name', 'email', 'img', 'status', 'location', 'gender', 'username']);
    User.findByIdAndUpdate(req.params.id, body, (err, __) => {
        if (err) {
            return res.status(400).json({ ok: false, message: err });
        }
        return res.json({ ok: true, message: 'Usuario actualizado correctamente' });
    });
};

export const deleteUser = async (req, res) => {
    User.findByIdAndUpdate(req.params.id, { status: false }, (err, __) => {
        if (err) {
            return res.status(404).json({ ok: false, message: err });
        }
        return res.json({ ok: true, message: 'Usuario eliminado correctamente' });
    });
};
