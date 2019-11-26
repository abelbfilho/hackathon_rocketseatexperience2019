import * as Yup from 'yup';
import Question from '../models/question';
import User from '../models/user';

class QuestionController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { user_type } = await User.findByPk(req.userId);

    if (user_type !== 1) {
      return res.status('401').json({ error: 'You don´t have permission!' });
    }
    
    const questions = await Question.findAll({
      attributes: ['question', 'answer1', 'answer2', 'answer3', 'answer4', 'points1', 'points2', 'points3', 'points4', 'disable'],
      limit: 25,
      offset: (page - 1) * 20,
    });
    return res.json(questions);
  }
}

export default new QuestionController();
