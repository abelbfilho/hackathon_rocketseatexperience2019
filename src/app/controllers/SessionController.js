import jwt from 'jsonwebtoken';

import User from '../models/user';
import File from '../models/file';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Password does not match' });
      }

      const {
        id,
        name,
        lastname,
        state,
        city,
        phone,
        points,
        classification,
        user_company,
        avatar_id,
      } = user;

      return res.json({
        user: {
          id,
          name,
          lastname,
          email,
          state,
          city,
          phone,
          points,
          classification,
          user_company,
          avatar_id,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new SessionController();
