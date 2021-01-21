import { response } from 'express'
import Transaction from '../models/Transaction'

const getTransactions = async (_, res = response) => {
    try {
        const transactions = await Transaction.find()
        res.json({ ok: true, transactions })
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Ha ocurrido un error' })
    }
}
const getTransactionsByID = async (req, res = response) => {
    const id = req.params.id
    if (!id) {
        res.status(400).json({ ok: false, message: 'El id es necesario' })
    }
    try {
        const transaction = await Transaction.findById(req.params.id).populate('Service')
        res.json({ ok: true, transaction })
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Ha ocurrido un error' })
    }
}
const getTransactionsByUserID = async (req, res = response) => {
    const user_id = req.params.user_id
    if (!id) {
        res.status(400).json({ ok: false, message: 'El user id es obligatorio' })
    }
    try {
        const transactions = await Transaction.find({ user_id }).populate('Service')
        res.json({ ok: true, transactions })
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Ha ocurrido un error' })
    }
}
const getTransactionsByFreelancerID = async (req, res = response) => {
    const freelancer_id = req.params.freelancer_id
    if (!freelancer_id) {
        res.status(400).json({ ok: false, message: 'El freelancer_id es obligatorio' })
    }
    try {
        const transactions = await Transaction.find({ 'service_id.freelancer_id': freelancer_id })
        res.json({ ok: true, transactions })
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Ha ocurrido un error' })
    }
}
const addNewTransaction = async (req, res = response) => {
    const { service_id, user_id, transaction_status } = req.body
    //TODO: check correct params
    console.log(service_id, user_id, transaction_status);
    try {
        const transaction = Transaction({ service_id, user_id, transaction_status })
        await transaction.save()
        res.json({ ok: true, transaction })
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Ha ocurrido un error' })
    }

}

module.exports = {
    getTransactions,
    getTransactionsByID,
    getTransactionsByUserID,
    getTransactionsByFreelancerID,
    addNewTransaction,
}