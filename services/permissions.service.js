const { User } = require('../models');

module.exports = {
  userPermissions: async id => {
    const user = await User.findById(id).populate('roles');
    console.log(user.roles);

    const permissions = user.roles.flatMap(role => role.permissions);

    return user.isAdmin ? [...permissions, 'ADMIN'] : permissions;
  },
};
