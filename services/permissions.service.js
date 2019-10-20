const { User } = require('../models');

function permissionsFromRole(role) {
  return role.permissions.reduce((acc, cur) => {
    acc.push(cur.name);

    return acc;
  }, []);
}

module.exports = {
  userPermissions: async id => {
    const user = await User.findById(id);

    const permissions = user.roles.reduce((acc, cur) => {
      const p = permissionsFromRole(cur);

      acc.push(...p);

      return acc;
    }, []);

    return user.isAdmin ? [...permissions, 'ADMIN'] : permissions;
  },
};
