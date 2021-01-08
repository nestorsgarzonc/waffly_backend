import Freelancer from '../models/Freelancer'
import { Service, categories } from '../models/Service'
import { validationResult } from 'express-validator'

export const findAllServices = async (_, res) => {
    const services = await Service.find()
    res.json({ ok: true, services })
}

export const findServiceById = async (req, res) => {
    const services = await Service.findById(req.params.id)
    res.json({ ok: true, services })
}

export const findServicesByCategories = async (req, res) => {
    const services = await Service.find({ category: req.params.category }).populate('freelancer_id')
    res.json({ ok: true, services })
}

export const findServicesByName = async (req, res) => {
    let regex = new RegExp(req.params.query, 'i')
    const services = await Service.find({ title: regex })
    res.json({ ok: true, services })
}

export const getCategories = async (_, res) => {
    res.json({ categories: categories.values })
}

export const createService = async (req, res) => {
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

export const deleteService = async (req, res) => {
    Service.findByIdAndUpdate(req.params.id, { status: false }, (err, __) => {
        if (err) {
            return res.status(400).json({ ok: false, message: err })
        }
        res.json({ ok: true, message: 'Servicio eliminado correctamente' })
    }
    )
}


export const addReviewToProduct = async (req, res) => {
    const errors = validationResult(req)
    if (errors.errors.length > 0) {
        return res.status(422).json({ ok: false, message: errors.errors })
    }
    let serviceObj = {
        stars: req.body.stars,
        review: req.body.review,
        user_id: req.body.user_id,
    }
    Service.findByIdAndUpdate(
        req.params.id,
        { $push: { reviews: serviceObj } },
        (err, __) => {
            if (err) {
                return res.status(400).json({ ok: false, message: err })
            }
            res.json({ ok: true, message: 'Calificacion añadida correctamente' })
        }
    )
}
