import Freelancer from '../models/Freelancer'
import Service from '../models/Service'
import _ from 'underscore'
import { validationResult } from 'express-validator'

exports.findAllFreelancers = async (__, res) => {
    Freelancer.find().exec((err, freelancers) => {
        if (err) {
            return res.status(400).json({ ok: false, message: err })
        }
        res.json({ ok: true, ...freelancers })
    })
}

exports.findFreelancerById = async (req, res) => {
    Freelancer
        .findById(req.params.id)
        .populate('services')
        .exec((err, freelancer) => {
            if (err) {
                return res.status(400).json({ ok: false, message: err })
            }
            res.json({ ok: true, ...freelancer['_doc'] })
        })
}

exports.updateFreelancer = async (req, res) => {
    let body = _.pick(req.body, [
        'first_name',
        'last_name',
        'username',
        'location',
        'document',
        'services',
        'gender',
        'email',
        'img',
    ])
    Freelancer.findByIdAndUpdate(req.params.id, body, (err, __) => {
        if (err) {
            return res.status(400).json({ ok: false, err })
        }
        res.json({ ok: true, message: 'Freelancer actualizado correctamente' })
    })
}

exports.addService = async (req, res) => {
    const errors = validationResult(req)
    if (errors.errors.length > 0) {
        return res.status(422).json({ ok: false, message: errors.errors })
    }
    let service = Service({
        title: req.body.title,
        category: req.body.category,
        is_presencial: req.body.is_presencial,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        freelancer_id: req.params.id,
    })
    service.save((err, service_saved) => {
        if (err) {
            return res.status(400).json({ ok: false, message: err })
        }
        Freelancer.findByIdAndUpdate(
            req.params.id,
            { $push: { services: service_saved._id } },
            (err_f, __) => {
                if (err_f) {
                    return res.status(400).json({ ok: false, message: err_f })
                }
                res.json({ ok: true, message: 'Servicio agregado correctamente' })
            })
    })
}

exports.deleteFreelancer = async (req, res) => {
    Freelancer.findByIdAndUpdate(req.params.id, { status: false }, (err, __) => {
        if (err) {
            return res.status(400).json({ ok: false, message: err })
        }
        res.json({ ok: true, message: 'Freelancer eliminado exitosamente' })
    })
}