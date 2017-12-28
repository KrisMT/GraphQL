const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

module.exports = {
  Query: {
    allLinks: async (root, data, {mongo: {Links}}) => {
      return await Links.find({}).toArray();
    },
  },

  Mutation: {
    createLink: async (root, data, {mongo: {Links}, user}) => {
      const newLink = Object.assign({postedById: user && user._id}, data);
      const response = await Links.insert(newLink);
      return Object.assign({id: response.insertedIds[0]}, newLink);
    },
    createUser: async (root, data, {mongo: {Users}}) => {
      const hashPassword = bcrypt.hashSync(data.authProvider.password, 10);
      const newUser = {
        name: data.name,
        email: data.authProvider.email,
        password: hashPassword,
      };

      const response = await Users.insert(newUser);
      return Object.assign({id: response.insertedIds[0]}, newUser);
    },
    signinUser: async (root, data, {mongo: {Users}}) => {
      const user = await Users.findOne({email: data.authProvider.email});
      bcrypt.compare(data.authProvider.password, user.password);
        return {token: `token-${user.email}`, user};
      };
    },
    createVote: async (root, data, {mongo: {Votes}, user}) => {
      const newVote = {
        userId: user && user._id,
        linkId: new ObjectID(data.linkId),
      };
      const response = await Votes.insert(newVote);
      return Object.assign({id: response.insertedIds[0]}, newVote);
    },
  },

  Link: {
    id: root => root._id || root.id,
    postedBy: async ({postedById}, data, {dataloaders: {userLoader}}) => {
      return await userLoader.load(postedById);
    },
    votes: async ({_id}, data, {mongo: {Votes}}) => {
      return await Votes.find({linkId: _id}).toArray();
    },
  },
  User: {
    id: root => root._id || root.id,
    votes: async ({_id}, data, {mongo: {Votes}}) => {
      return await Votes.find({userId: _id}).toArray();
    },
  },
  Vote: {
    id: root => root._id || root.id,
    user: async ({userId}, data, {dataloaders: {userLoader}}) => {
      return await userLoader.load(userId);
    },
    link: async ({linkId}, data, {mongo: {Links}}) => {
      return await Links.findOne({_id: linkId});
    },
  },
};

