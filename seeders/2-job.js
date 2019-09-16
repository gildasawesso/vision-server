module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('jobs', null, {});

    await queryInterface.bulkInsert(
      'jobs',
      [
        {
          id: 1,
          name: 'software',
          createdAt: '2019-07-04 08:09:38',
          updatedAt: '2019-06-06 05:33:52',
        },
        {
          id: 2,
          name: 'real-time',
          createdAt: '2018-12-31 05:46:24',
          updatedAt: '2019-04-06 06:11:05',
        },
        {
          id: 3,
          name: 'executive',
          createdAt: '2018-10-11 07:09:07',
          updatedAt: '2019-05-31 13:08:12',
        },
        {
          id: 4,
          name: 'capacity',
          createdAt: '2018-09-26 02:12:50',
          updatedAt: '2019-06-13 23:38:27',
        },
        {
          id: 5,
          name: 'methodology',
          createdAt: '2018-10-10 19:06:39',
          updatedAt: '2019-01-08 17:47:16',
        },
        {
          id: 6,
          name: 'national',
          createdAt: '2019-05-14 15:57:18',
          updatedAt: '2019-03-03 07:25:09',
        },
        {
          id: 7,
          name: 'optimizing',
          createdAt: '2019-07-19 03:14:39',
          updatedAt: '2018-12-15 02:45:20',
        },
        {
          id: 8,
          name: 'Persevering',
          createdAt: '2018-12-12 17:11:18',
          updatedAt: '2019-06-22 11:07:04',
        },
        {
          id: 9,
          name: 'Seamless',
          createdAt: '2018-12-11 02:22:49',
          updatedAt: '2019-06-22 19:38:18',
        },
        {
          id: 10,
          name: 'encompassing',
          createdAt: '2019-07-30 12:42:59',
          updatedAt: '2019-06-13 02:03:59',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('jobs', null, {});
  },
};
