const config = require('./config');
const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');

const HEADER_REGEX = /Bearer (.*)$/;

const authenticate = async ({headers: {authorization}}, Users) => {
  const token = authorization && HEADER_REGEX.exec(authorization)[1];
  var decoded = '';
  try {
    decoded = jwt.verify(token, config.secret);
    console.log(decoded);
  }catch(err) {
    return null;
  }
  return decoded && await Users.findOne({_id: new ObjectID(decoded._id)});
}

module.exports.authenticate = authenticate;
