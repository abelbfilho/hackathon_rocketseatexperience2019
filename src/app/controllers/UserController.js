import * as Yup from 'yup';
import User from '../models/user';
import File from '../models/file';

class UserController {
  async store(req, res) {
    // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;,
    // phone: Yup.string().required(), // .matches(phoneRegExp, 'Phone number is not valid'),
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      lastname: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      user_company: Yup.boolean(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status('400').json({ error: 'Validation failed.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status('400').json({ error: 'User already exists.' });
    }

    const {
      id,
      name,
      lastname,
      email,
      state,
      city,
      phone,
      user_company,
    } = await User.create(req.body);

    return res.json({
      id,
      name,
      lastname,
      email,
      state,
      city,
      phone,
      user_company,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      lastname: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8),
      password: Yup.string()
        .min(8)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status('400').json({ error: 'Validation failed.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);
    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status('400').json({ error: 'User already exists.' });
      }
    }
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status('401').json({ error: 'Password does not match!' });
    }

    await user.update(req.body);

    const { id, name, avatar_id } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json({ id, name, email, avatar_id });
  }

  raiz(req, res) {
    return res.json('Rackathon!');
  }
}

export default new UserController();
