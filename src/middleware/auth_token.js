import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
    const token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, _) => {
        if (err) {
            return res.status(400).json({ ok: false, message: 'Token no valido', err });
        }
        next();
    });
};

export const checkUserToken = (req, res, next) => {
    const token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({ ok: false, message: 'Token no valido', err });
        }
        if (!decoded.user) {
            return res.status(400).json({ ok: false, message: 'Permisos no validos', err });
        }
        req.usuario = decoded.user;
        next();
    });
};

export const checkFreelancerToken = (req, res, next) => {
    const token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({ ok: false, message: 'Token no valido', err });
        }
        if (!decoded.freelancer) {
            return res.status(400).json({ ok: false, message: 'Permisos no validos', err });
        }
        req.freelancer = decoded.freelancer;
        next();
    });
};
