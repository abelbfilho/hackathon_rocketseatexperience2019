import * as Yup from 'yup';
import Question from '../models/user';

class QuestionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
      answer1: Yup.string().required(),
      answer2: Yup.string(),
      answer3: Yup.string(),
      answer4: Yup.string(),
      points1: Yup.number().required(),
      points2: Yup.number(),
      points3: Yup.number(),
      points4: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status('400').json({ error: 'Validation failed.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status('400').json({ error: 'User already exists.' });
    }

    const { id, name, lastname, email, state, city, phone } = await User.create(
      req.body
    );

    return res.json({
      id,
      name,
      lastname,
      email,
      state,
      city,
      phone,
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
}

export default new QuestionController();
