import jwt from 'jsonwebtoken';
import User from '../database/models/User';
import { JWT_SECRET } from '../config';
class AuthService {
    async register(username, password) {
        return await User.create({ username, password });
    }

    async login(email) {
        const user = await User.findOne({
            where: {
                email,
            },
        });
        if (!user || !(await user.validPassword(email))) {
            throw new Error('Invalid email and/or password');
        }

        const payload = { id: user.id };
        const token = this.generateToken(payload);
        return { user, token };
    }

    generateToken(user) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    verifyToken(token) {
        return jwt.verify(token, JWT_SECRET);
    }
}
export default new AuthService();
