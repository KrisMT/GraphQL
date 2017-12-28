const jwt = require('jsonwebtoken');
const config = require('./config');

const HEADER_REGEX = /bearer (.*)$/;

const authenticate = async ({headers: {authorization}}, Users) => {
  const token = authorization && HEADER_REGEX.exec(authorization)[1];
  const email = authorization && HEADER_REGEX.exec(authorization)[1];
  return email && await Users.findOne({email});
}

module.exports.authenticate = authenticate;
