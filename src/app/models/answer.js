import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        answer: Sequelize.INTEGER,
        points: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.File, { foreignKey: 'question_id', as: 'question' });
  }
}

export default User;
