const { userPermissions } = require('../services/permissions.service');
const { usersCount, userInformations, updateUser } = require('../services/users.service');
const { registerUser } = require('../services/auth.service');
const { decodeToken } = require('../utils/jwt');
const context = require('../services/db_context');

module.exports = {
  isAdminExist: async (req, res) => {
    const number = context.users.model.count();

    number > 0 ? res.json(true) : res.json(false);
  },

  add: async (req, res) => {
    const data = req.body;

    const payload = await registerUser(data.username, data.password, data.firstname, data.lastname, data.isAdmin);
    const { _id } = decodeToken(payload.accessToken);
    const user = await userInformations(_id);

    delete data.password;
    await updateUser(_id, data);

    return res.json(user);
  },

  permissions: async (req, res) => {
    const { _id } = req.auth;
    const permissions = await userPermissions(_id);

    return res.json(permissions);
  },

  count: async (req, res) => {
    const count = await usersCount();

    return res.json(count);
  },

  me: async (req, res) => {
    const { _id } = req.auth;
    const user = await userInformations(_id);

    return res.json(user);
  },

  update: async (req, res) => {
    const { _id } = req.auth;
    const data = req.body;

    const user = await updateUser(_id, data);

    return res.json(user);
  },
};
