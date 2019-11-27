// import * as Yup from 'yup';
import Question from '../models/question';
import User from '../models/user';

class QuestionController {
  async index(req, res) {
    const { page = 1 } = req.query;

    // Verify if is company user
    const user = await User.findByPk(req.userId);
    if (user.user_company) {
      return res.status('401').json({ error: 'You don´t have questions!' });
    }

    const questions = await Question.findOne({
      where: {
        id: user.last_question + 1,
      },
      attributes: [
        'id',
        'question',
        'answer1',
        'answer2',
        'answer3',
        'answer4',
        'points1',
        'points2',
        'points3',
        'points4',
        'disabled',
      ],
      limit: 25,
      offset: (page - 1) * 20,
    });
    return res.json(questions);
  }
}

export default new QuestionController();
