const { User } = require('../models');
const context = require('./db_context');

module.exports = {
  usersCount: async () => {
    return User.countDocuments();
  },

  userInformations: async id => {
    return User.findById(id);
  },

  userSchool: async id => {
    const user = await context.users.one(id);

    return user.schools[0];
  },

  updateUser: async (id, user) => {
    return User.findOneAndUpdate({ _id: id }, user, { new: true });
  },
};
