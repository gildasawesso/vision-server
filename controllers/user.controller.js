const { userPermissions } = require('../services/permissions.service');
const { usersCount, userInformations, updateUser } = require('../services/users.service');
const { registerUser, isUserEmailExist, hashPassword } = require('../services/auth.service');
const { decodeToken } = require('../utils/jwt');
const context = require('../services/db_context');

module.exports = {
  isAdminExist: async (req, res) => {
    const number = context.users.model.count();

    number > 0 ? res.json(true) : res.json(false);
  },

  all: async (req, res) => {
    const users = await context.users.Model
      .find({ schools: req.school }, '-password', { sort: { lastname: 1 } })
      .lean()
      .populate('roles', 'name');

    return res.json(users);
  },

  add: async (req, res) => {
    const data = req.body;
    data.schools = [req.school];

    const payload = await registerUser(data.username, data.password, data.firstname, data.lastname, data.isAdmin);
    const { _id } = decodeToken(payload.accessToken);

    delete data.password;
    await updateUser(_id, data);
    const user = await userInformations(_id);

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
    const { username } = req.body;
    if (await isUserEmailExist(username)) {
      throw new BadRequest('Username existe already');
    }

    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }

    await context.users.update(req.params.id, req.body);
    const user = await context.users.Model.findById(req.params.id, '-password')
      .lean()
      .populate('roles', 'name');
    res.json(user);
  },

  delete: async (req, res) => {
    await context.users.delete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  }
};
