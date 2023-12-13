const { registerUser, authenticateUser, renewToken, registerAdmin, authenticateAdmin } = require('../services/auth.service');

async function register(req, res) {
  const { username, password, firstname, lastname, isAdmin } = req.body;

  const token = await registerUser(username, password, firstname, lastname, isAdmin);

  await res.json(token);
}

async function signin(req, res) {
  const { username, password } = req.body;

  const token = await authenticateUser(username, password);

  await res.json(token);
}

async function renew(req, res) {
  const { refreshToken } = req.body;

  const token = await renewToken(refreshToken);

  await res.json(token);
}

async function adminRegister(req, res) {
  const { email, password, username } = req.body;

  const token = await registerUser(email, password, username);

  await res.json(token);
}

async function adminSignin(req, res) {
  const { email, password } = req.body;

  const token = await authenticateUser(email, password);

  await res.json(token);
}

async function adminRenew(req, res) {
  const { refreshToken } = req.body;

  const token = await renewToken(refreshToken);

  await res.json(token);
}

module.exports.register = register;
module.exports.signin = signin;
module.exports.renew = renew;
module.exports.adminRegister = adminRegister;
module.exports.adminSignin = adminSignin;
module.exports.adminRenew = adminRenew;
