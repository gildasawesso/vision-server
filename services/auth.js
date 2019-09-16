const { BadRequest, Unauthorized } = require('http-errors');
const { genSalt, hash, compare } = require('bcrypt');

const { generateToken, generateAdminToken, decodeToken } = require('../utils/jwt');
const { User } = require('../models');
const { Admin } = require('../models');

async function isUserEmailExist(email) {
  const userFetched = await User.findOne({ where: { email } });

  return userFetched != null;
}

async function registerUser(newEmail, newPassword, newUsername) {
  if (await isUserEmailExist(newEmail)) {
    throw new BadRequest('User email existe already');
  } else {
    const salt = await genSalt(10);
    const hashedPassword = await hash(newPassword, salt);

    const user = new User({
      email: newEmail,
      password: hashedPassword,
      username: newUsername,
    });

    const { id, email, username } = await user.save();

    return generateToken({ id, email, username }, { id });
  }
}

async function authenticateUser(emailSubmitted, passwordSubmitted) {
  if (await isUserEmailExist(emailSubmitted)) {
    const { id, email, username, password } = await User.findOne({
      where: { email: emailSubmitted },
      attributes: { include: ['password'] },
    });
    const isSamePassword = await compare(passwordSubmitted, password);

    if (isSamePassword) {
      return generateToken({ id, email, username }, { id });
    }
    throw new Unauthorized();
  } else {
    throw new BadRequest("User email doesn't exsit");
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
  const { id } = decodeToken(refresToken);
  const { email, username, disabled } = await User.findByPk(id);

  if (disabled) {
    throw new Unauthorized();
  } else {
    return generateToken({ id, email, username }, { id });
  }
}

module.exports.registerUser = registerUser;
module.exports.authenticateUser = authenticateUser;
module.exports.isUserEmailExist = isUserEmailExist;
module.exports.isAdminEmailExist = isAdminEmailExist;
module.exports.registerAdmin = registerAdmin;
module.exports.authenticateAdmin = authenticateAdmin;
module.exports.renewToken = renewToken;
