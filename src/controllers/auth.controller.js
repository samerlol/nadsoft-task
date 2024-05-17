import { ACCESS_TOKEN } from '../constants/auth.constant';
import authService from '../services/auth.service';

class AuthController {

  async login(req, res) {
    try {
      const { email } = req.body;
      const { user, token } = await authService.login(email);
      res.cookie(ACCESS_TOKEN, token, {
        secure: true,
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  logout(req, res) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to logout' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  }
}

export default new AuthController();