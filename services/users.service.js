const { User } = require('../models');

module.exports = {
  usersCount: async () => {
    return User.countDocuments();
  },

  userInformations: async id => {
    return User.findById(id);
  },

  userSchool: async id => {
    const user = await module.exports.userInformations(id);

    return User.findById(user.schools[0]._id);
  },

  updateUser: async (id, user) => {
    return User.findOneAndUpdate({ _id: id }, user, { new: true });
  },
};
