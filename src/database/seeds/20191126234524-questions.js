module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'questions',
      [
        {
          question: 'Você se interessa mais por qual área?',
          answer1: 'Exatas',
          answer2: 'Humanas',
          answer3: 'Ambas',
          answer4: null,
          points1: 10,
          points2: 100,
          points3: 1000,
          points4: null,
          disabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: 'Como você se considera?',
          answer1: 'Racional',
          answer2: 'Emocional',
          answer3: 'Ambos',
          answer4: null,
          points1: 10,
          points2: 100,
          points3: 1000,
          points4: null,
          disabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: 'O que você prefere para aprender um conteúdo novo?',
          answer1: 'Textos',
          answer2: 'Imagens',
          answer3: 'Vídeos',
          answer4: 'Todas as anteriores',
          points1: 10,
          points2: 100,
          points3: 100,
          points4: 1000,
          disabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: 'O que você prefere em momentos de distração?',
          answer1: 'Filmes',
          answer2: 'Livros',
          answer3: 'Ambos',
          answer4: null,
          points1: 100,
          points2: 10,
          points3: 1000,
          points4: null,
          disabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: 'Você tem facilidade de trabalhar em grupo?',
          answer1: 'Sim',
          answer2: 'Não',
          answer3: null,
          answer4: null,
          points1: 0,
          points2: 0,
          points3: null,
          points4: null,
          disabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          question: 'Você gostaria de compartilhar seus resultados com a ZUP?',
          answer1: 'Sim',
          answer2: 'Não',
          answer3: null,
          answer4: null,
          points1: 0,
          points2: 0,
          points3: 0,
          points4: 0,
          disabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('questions', null, {}),
};
