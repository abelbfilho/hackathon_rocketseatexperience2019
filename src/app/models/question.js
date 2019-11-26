import Sequelize, { Model } from 'sequelize';

class Question extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.STRING,
        answer1: Sequelize.STRING,
        answer2: Sequelize.STRING,
        answer3: Sequelize.STRING,
        answer4: Sequelize.STRING,
        points1: Sequelize.INTEGER,
        points2: Sequelize.INTEGER,
        points3: Sequelize.INTEGER,
        points4: Sequelize.INTEGER,
        disabled: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Question;
