import * as Yup from 'yup';
import Answer from '../models/answer';
import User from '../models/user';
import Question from '../models/question';

class AnswerController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status('400').json({ error: 'Validation failed.' });
    }

    // Verify if is company user
    const user = await User.findByPk(req.userId);
    if (user.user_company) {
      return res.status('401').json({ error: 'You don´t have questions!' });
    }

    // Verify if the user already answer this question
    const { question_id } = req.params;
    const { answer } = req.body;
    const answer_exist = await Answer.findOne({
      where: {
        question_id,
        user_id: req.userId,
      },
    });

    if (answer_exist) {
      return res
        .status('401')
        .json({ error: 'You already answered this question!' });
    }

    //calculate Total Points of user
    const { points } = user;
    const questionReg = await Question.findByPk(question_id);
    let newPoints = points;
    if (answer === 1) {
      newPoints += questionReg.points1;
    } else if (answer === 2) {
      newPoints += questionReg.points2;
    } else if (answer === 3) {
      newPoints += questionReg.points3;
    } else if (answer === 4) {
      newPoints += questionReg.points4;
    }

    //verify the number of answers of the user to set classification
    //const { count: numAnswer } = await Answer.findAndCountAll({
    const oldAnswers = await Answer.findAll({
      where: { user_id: req.userId },
      attributes: ['id'],
      order: ['created_at'],
    });

    const numAnswer = oldAnswers.length + 1;
    let newClassification = 0;
    if (numAnswer >= 3) {
      if (newPoints < 300) {
        newClassification = 1;
      } else if (newPoints < 3000) {
        newClassification = 2;
      } else {
        newClassification = 3;
      }
    }

    await user.update({
      classification: newClassification,
      points: newPoints,
    });

    await Answer.create({
      question_id,
      user_id: req.userId,
      answer,
      points: newPoints,
    });

    return res.json({
      newClassification,
      newPoints,
    });
  }
}

export default new AnswerController();
