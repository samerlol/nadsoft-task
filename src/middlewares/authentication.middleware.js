
import jwt from 'jsonwebtoken';
import { getStoredCookie } from '../utils/cookies';
import { ACCESS_TOKEN } from '../constants/auth.constant';

const authMiddleware = (req, res, next) => {
    const token = getStoredCookie(req.headers.cookie, ACCESS_TOKEN);

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