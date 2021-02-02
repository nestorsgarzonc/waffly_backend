import _ from 'underscore';
import Freelancer from '../models/Freelancer';

export const findAllFreelancers = async (__, res) => {
    Freelancer
        .find()
        .populate('services')
        .exec((err, freelancers) => {
            if (err) {
                return res.status(400).json({ ok: false, message: err });
            }
            res.json({ ok: true, freelancers });
        });
};

export const findFreelancerById = async (req, res) => {
    Freelancer
        .findById(req.params.id)
        .populate('services')
        .exec((err, freelancer) => {
            if (err) {
                return res.status(400).json({ ok: false, message: err });
            }
            res.json({ ok: true, freelancer });
        });
};

export const updateFreelancer = async (req, res) => {
    const body = _.pick(req.body, [
        'first_name',
        'last_name',
        'username',
        'location',
        'document',
        'services',
        'gender',
        'email',
        'phone',
        'img',
    ]);
    Freelancer.findByIdAndUpdate(req.params.id, body, (err, __) => {
        if (err) {
            return res.status(400).json({ ok: false, err });
        }
        res.json({ ok: true, message: 'Freelancer actualizado correctamente' });
    });
};

export const deleteFreelancer = async (req, res) => {
    Freelancer.findByIdAndUpdate(req.params.id, { status: false }, (err, __) => {
        if (err) {
            return res.status(400).json({ ok: false, message: err });
        }
        res.json({ ok: true, message: 'Freelancer eliminado exitosamente' });
    });
};
