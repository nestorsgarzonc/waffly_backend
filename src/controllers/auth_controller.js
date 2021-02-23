import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import _ from 'underscore';
import Freelancer from '../models/Freelancer';
import User from '../models/User';

export const userLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (errors.errors.length > 0) {
            return res.status(422).json({ ok: false, message: errors.errors });
        }
        const user = await User.findOne({ email: req.body.email, status: true })
        if (!user) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado', err });
        } if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(404).json({ ok: false, message: 'Usuario o contraseña incorrecta', err });
        }
        const token = jwt.sign({ id: user._id, type: user.type }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        return res.json({ ok: true, user, token });
    } catch (err) {
        return res.status(404).json({ ok: false, message: 'Error ', err });
    }
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
        'img',
    );
    props.password = bcrypt.hashSync(props.password, 10);
    try {
        const user = User(props);
        const new_user = await user.save()
        return res.json({ ok: true, message: 'Usuario creado correctamente', ...new_user._doc });
    } catch (err) {
        return res.status(400).json({ ok: false, message: err });
    }
};

export const freelancerLogin = async (req, res) => {
    const errors = validationResult(req);
    if (errors.errors.length > 0) {
        return res.status(422).json({ ok: false, message: errors.errors });
    }
    try {
        const freelancer = await Freelancer.findOne({ email: req.body.email })
        if (!freelancer) {
            return res.status(404).json({ ok: false, message: 'Freelancer no encontrado', err });
        } if (!bcrypt.compareSync(req.body.password, freelancer.password)) {
            return res.status(404).json({ ok: false, message: 'Freelancer o contraseña incorrecta', err });
        }
        const token = jwt.sign({ id: freelancer._id, type: freelancer.type }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        return res.json({ ok: true, freelancer, token });
    } catch (err) {
        return res.status(404).json({ ok: false, message: 'Error ', err });
    }

};

export const freelancerSignUp = async (req, res) => {
    const errors = validationResult(req);
    if (errors.errors.length > 0) {
        return res.status(422).json({ ok: false, message: errors.errors });
    }
    try {
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
        const new_freelancer = await freelancer.save()
        res.json({ ok: true, message: 'Freelancer creado correctamente', ...new_freelancer._doc });
    } catch (err) {
        return res.status(400).json({ ok: false, message: err });
    }
};
