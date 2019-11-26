module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('questions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      answer3: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      answer4: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      points1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      points2: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      points3: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      points4: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      disabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('questions');
  },
};
