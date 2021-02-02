import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import _ from 'underscore';
import Freelancer from '../models/Freelancer';
import User from '../models/User';

export const userLogin = (req, res) => {
    const errors = validationResult(req);
    if (errors.errors.length > 0) {
        return res.status(422).json({ ok: false, message: errors.errors });
    }
    User.findOne({ email: req.body.email, status: true }, (err, user) => {
        if (err) {
            return res.status(404).json({ ok: false, message: 'Error ', err });
        } if (!user) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado', err });
        } if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(404).json({ ok: false, message: 'Usuario o contraseña incorrecta', err });
        }
        // TODO: change user propierties in jwt
        const token = jwt.sign({ user }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        res.json({ ok: true, user, token });
    });
};

export const userSignUp = async (req, res) => {
    const props = _.pick(req.body,
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
        'location',
        'document',
        'document_type',
        'gender',
        'img');
    console.log(props);
    props.password = bcrypt.hashSync(props.password, 10);
    console.log(props);
    const user = User(props);
    console.log(user);
    user.save((err, new_user) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ ok: false, message: err });
        }
        res.json({ ok: true, message: 'Usuario creado correctamente', ...new_user._doc });
    });
};

export const freelancerLogin = (req, res) => {
    const errors = validationResult(req);
    if (errors.errors.length > 0) {
        return res.status(422).json({ ok: false, message: errors.errors });
    }
    Freelancer.findOne({ email: req.body.email }, (err, freelancer) => {
        if (err) {
            return res.status(404).json({ ok: false, message: 'Error ', err });
        } if (!freelancer) {
            return res.status(404).json({ ok: false, message: 'Freelancer no encontrado', err });
        } if (!bcrypt.compareSync(req.body.password, freelancer.password)) {
            return res.status(404).json({ ok: false, message: 'Freelancer o contraseña incorrecta', err });
        }
        const token = jwt.sign({ freelancer }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        res.json({ ok: true, freelancer, token });
    });
};

export const freelancerSignUp = async (req, res) => {
    const errors = validationResult(req);
    if (errors.errors.length > 0) {
        return res.status(422).json({ ok: false, message: errors.errors });
    }
    const freelancer = Freelancer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        location: req.body.location,
        document: req.body.document,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        img: req.body.img,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    freelancer.save((err, new_freelancer) => {
        if (err) {
            return res.status(400).json({ ok: false, message: err });
        }
        res.json({ ok: true, message: 'Freelancer creado correctamente', ...new_freelancer._doc });
    });
};
