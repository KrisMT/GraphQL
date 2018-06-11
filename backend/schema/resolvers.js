const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const pubsub = require('../pubsub');
const { withFilter } = require('graphql-subscriptions');

const buildFilters = ({OR = [], description_contains, url_contains}) => {
  const filter = (description_contains || url_contains) ? {} : null;
  if( description_contains ) {
    filter.description = {$regex: `.*${description_contains}.*`};
  }
  if( url_contains ) {
    filter.url = {$regex: `.*${url_contains}.*`};
  }

  let filters = filter ? [filter] : [];
  for( let i = 0; i < OR.length; i++ ) {
    filters = filters.concat(buildFilters(OR[i]));
  }
  return filters;
}

module.exports = {
  Query: {
    allLinks: async (root, {filter, skip, limit}, {mongo: {Links}}) => {
      const query = filter ? {$or: buildFilters(filter)} : {};
      const cursor = Links.find(query);
      if( limit ) cursor.limit(limit);
      if( skip ) cursor.skip(skip);
      return cursor.toArray();
    },
    allLocations: async (root, data, {mongo: {Locations}}) => {
      return await Locations.find({}).toArray();
    },
  },

  Mutation: {
    createLink: async (root, data, {mongo: {Links}, user}) => {
      if( !user ) throw new Error('Unauthorize user');
      const newLink = Object.assign({postedBy: user && user._id}, data);
      const response = await Links.insert(newLink);
      newLink.id = response.insertedIds[0];
      pubsub.publish('Link', {Link: {mutation: ['CREATED'], node: newLink} });
      return newLink;
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
      const correct = bcrypt.compareSync(data.authProvider.password, user.password);
      if(correct) {
        const token = jwt.sign({ _id: user._id}, config.secret, {expiresIn: '1h'} );
        return {token: `Bearer ${token}`, user};
      }
      return {token: 'Bearer Unauthenicated', user};
    },
    createLocation: async (root, data, {mongo: {Locations}}) => {
      const newLocation = {
        name: data.name
      };
      const response = await Locations.insert(newLocation);
      return Object.assign({id: response.insertedIds[0]}, newLocation);
    },
    createGood: async (root, data, {mongo: {Goods}}) => {
      const newGood = {
        upcode: data.qrcode.upcode,
        cpecode: data.qrcode.cpecode,
        name: data.goodname,
        income: data.startdate,
      };
      const response = await Goods.insert(newGood);
      return Object.assign({id: response.insertedIds[0]}, newGood);
    },
    createCheck: async (root, data, {mongo: {Checks, Goods}, user}) => {
      if( !user ) throw new Error('Unauthorize user');
      let goodId;
      await Goods.findOne({$or: [
        {upcode: data.qrcode.upcode},
        {cpecode: data.qrcode.cpecode}
      ]}).then( res => {
        goodId = res._id;
      });

      const newCheck = {
        good: goodId,
        location: data.locationId,
        user: user && user._id,
        checkDate: data.date,
      };

      const response = await Checks.insert(newCheck);
      return Object.assign({id: response.insertedIds[0]}, newCheck);
    },
  },

  Subscription: {
    Link: {
      subscribe: withFilter(
        () => {
          return pubsub.asyncIterator('Link')
        },
        (payload, args) => {
          return  true;
        }),
    },
  },

  Link: {
    id: root => root._id || root.id,
    postedBy: async ({postedBy}, data, {dataloaders: {userLoader}}) => {
      return await userLoader.load(postedBy);
    },
    //votes: async ({_id}, data, {dataloaders: {voteBylinkIdLoader}}) => {
    //  return await voteBylinkIdLoader.load(_id);
    //},
  },
  User: {
    id: root => root._id || root.id,
    //votes: async ({_id}, data, {dataloaders: {voteByuserIdLoader}}) => {
    //  return await voteByuserIdLoader.load(_id);
    //},
  },
  Location: {
    id: root => root._id || root.id,
  },
};

