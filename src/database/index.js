import Sequelize from 'sequelize';

import User from '../app/models/user';
import File from '../app/models/file';
import Question from '../app/models/question';
import Answer from '../app/models/answer';

import databaseConfig from '../config/database';

const models = [User, File, Question, Answer];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
