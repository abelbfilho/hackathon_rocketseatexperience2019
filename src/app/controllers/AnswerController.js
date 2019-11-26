import * as Yup from 'yup';
import Answer from '../models/answer';
import User from '../models/user';

class AnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status('400').json({ error: 'Validation failed.' });
    }

    // Verify if is company user
    const { user_company } = await User.findByPk(req.userId);
    if (user_company) {
      return res.status('401').json({ error: 'You don´t have questions!' });
    }

    // Verify if the user already answer this question
    const { answer_exist } = await Answer.findOne({
      where: {
        user_id: req.UserId,
        question_id: req.param,
      },
    });
    if (answer_exist) {
      return res
        .status('401')
        .json({ error: 'You already answered this question!' });
    }

    const numAnswer = Answer.findAll({
      where: { user_id: req.userId },
      attributes: ['id'],
    });

    const { id, name, lastname, email, state, city, phone } = await Answer.create(
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
}

export default new AnswerController();
