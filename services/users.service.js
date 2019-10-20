const { User } = require('../models');

module.exports = {
  usersCount: async () => {
    return User.countDocuments();
  },

  userInformations: async id => {
    return User.findById(id);
  },

  updateUser: async (id, user) => {
    return User.findOneAndUpdate({ _id: id }, user, { new: true });
  },
};
