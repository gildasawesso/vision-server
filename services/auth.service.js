const { BadRequest, Unauthorized } = require('http-errors');
const { genSalt, hash, compare } = require('bcrypt');

const { generateToken, generateAdminToken, decodeToken } = require('../utils/jwt');
const { User } = require('../models');
const { Admin } = require('../models');

async function isUserEmailExist(email) {
  const userFetched = await User.findOne({ where: { email } });

  return userFetched != null;
}

async function isUsernameExist(username) {
  const userFetched = await User.findOne({ username });

  return userFetched != null;
}

async function hashPassword(password) {
  const salt = await genSalt(10);
  return await hash(password, salt);
}

async function registerUser(newUsername, newPassword, firstname, lastname, isAdmin) {
  if (await isUsernameExist(newUsername)) {
    throw new BadRequest('Username existe already');
  } else {
    const salt = await genSalt(10);
    const hashedPassword = await hash(newPassword, salt);

    const user = new User({
      username: newUsername,
      password: hashedPassword,
      firstname,
      lastname,
      isAdmin,
    });

    const { _id, username } = await user.save();

    return generateToken({ _id, username }, { _id });
  }
}

async function authenticateUser(usernameSubmitted, passwordSubmitted) {
  if (await isUsernameExist(usernameSubmitted)) {
    const { _id, username, password, firstname, lastname } = await User.findOne({ username: usernameSubmitted });
    const isSamePassword = await compare(passwordSubmitted, password);

    if (isSamePassword) {
      return generateToken({ _id, username, firstname, lastname }, { _id });
    }
    throw new Unauthorized("L'utilisateur ou le mot de passe est incorrecte");
  } else {
    throw new Unauthorized("L'utilisateur ou le mot de passe est incorrecte");
  }
}

async function isAdminEmailExist(email) {
  const adminFetched = await Admin.findOne({ where: { email } });

  return adminFetched != null;
}

async function registerAdmin(newEmail, newPassword, name) {
  if (await isAdminEmailExist(newEmail)) {
    throw new BadRequest('User email existe already');
  } else {
    const salt = await genSalt(10);
    const hashedPassword = await hash(newPassword, salt);

    const { id, email } = await Admin.create({
      email: newEmail,
      password: hashedPassword,
      name,
    });

    return generateAdminToken({ id, email, name }, { id });
  }
}

async function authenticateAdmin(emailSubmitted, passwordSubmitted) {
  if (await isAdminEmailExist(emailSubmitted)) {
    const { id, email, name, password } = await Admin.findOne({ where: { email: emailSubmitted } });
    const isSamePassword = await compare(passwordSubmitted, password);

    if (isSamePassword) {
      return generateAdminToken({ id, email, name }, { id });
    }
    throw new Unauthorized();
  } else {
    throw new BadRequest("Admin email doesn't exsit");
  }
}

async function renewToken(refresToken) {
  const { _id } = decodeToken(refresToken);
  const { username, firstname, lastname, disabled } = await User.findById(_id);

  if (disabled) {
    throw new Unauthorized();
  } else {
    return generateToken({ _id, username, firstname, lastname }, { _id });
  }
}

module.exports.registerUser = registerUser;
module.exports.authenticateUser = authenticateUser;
module.exports.isUserEmailExist = isUserEmailExist;
module.exports.isAdminEmailExist = isAdminEmailExist;
module.exports.registerAdmin = registerAdmin;
module.exports.authenticateAdmin = authenticateAdmin;
module.exports.renewToken = renewToken;
module.exports.hashPassword = hashPassword;
