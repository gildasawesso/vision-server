const { registerUser, authenticateUser, renewToken } = require('../services/auth');

async function register(req, res) {
  const { email, password, username } = req.body;

  const token = await registerUser(email, password, username);

  await res.json(token);
}

async function signin(req, res) {
  const { email, password } = req.body;

  const token = await authenticateUser(email, password);

  await res.json(token);
}

async function renew(req, res) {
  const { refreshToken } = req.body;

  const token = await renewToken(refreshToken);

  await res.json(token);
}

module.exports.register = register;
module.exports.signin = signin;
module.exports.renew = renew;
