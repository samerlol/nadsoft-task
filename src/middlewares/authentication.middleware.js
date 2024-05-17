
import jwt from 'jsonwebtoken';
import { getStoredCookie } from '../utils/cookies';

const authMiddleware = (req, res, next) => {
    console.log({headers: req.headers.cookie})
    const token = getStoredCookie(req.headers.cookie, 'accessToken');

    if (!token) {
        return res.status(401).json({ error: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;