import { response } from 'express';
import { Service } from '../models/Service';
import Transaction from '../models/Transaction';

const getTransactions = async (_, res = response) => {
    try {
        const transactions = await Transaction.find().populate('service_id');
        res.json({ ok: true, transactions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Ha ocurrido un error' });
    }
};
const getTransactionsByID = async (req, res = response) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ ok: false, message: 'El id es necesario' });
    }
    try {
        const transaction = await Transaction.findById(req.params.id).populate('service_id');
        res.json({ ok: true, transaction });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Ha ocurrido un error' });
    }
};
const getTransactionsByUserID = async (req, res = response) => {
    const { user_id } = req.params;
    if (!user_id) {
        res.status(400).json({ ok: false, message: 'El user id es obligatorio' });
    }
    try {
        const transactions = await Transaction.find({ user_id }).populate('freelancer_id').populate('service_id');
        res.json({ ok: true, transactions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Ha ocurrido un error' });
    }
};
const getTransactionsByFreelancerID = async (req, res = response) => {
    const { freelancer_id } = req.params;
    if (!freelancer_id) {
        res.status(400).json({ ok: false, message: 'El freelancer_id es obligatorio' });
    }
    try {
        const transactions = await Transaction.find({ freelancer_id }).populate('service_id user_id');
        res.json({ ok: true, transactions });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Ha ocurrido un error' });
    }
};
const addNewTransaction = async (req, res = response) => {
    const { service_id, user_id, transaction_status } = req.body;
    try {
        const { freelancer_id } = await Service.findById(service_id)
        const transaction = Transaction({ service_id, user_id, transaction_status, freelancer_id });
        await transaction.save();
        res.json({ ok: true, transaction });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: 'Ha ocurrido un error' });
    }
};

module.exports = {
    getTransactions,
    getTransactionsByID,
    getTransactionsByUserID,
    getTransactionsByFreelancerID,
    addNewTransaction,
};
