import Freelancer from '../models/Freelancer'
import _ from 'underscore'

exports.findAllFreelancers = async (__, res) => {
    Freelancer
        .find()
        .populate('services')
        .exec((err, freelancers) => {
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

exports.deleteFreelancer = async (req, res) => {
    Freelancer.findByIdAndUpdate(req.params.id, { status: false }, (err, __) => {
        if (err) {
            return res.status(400).json({ ok: false, message: err })
        }
        res.json({ ok: true, message: 'Freelancer eliminado exitosamente' })
    })
}