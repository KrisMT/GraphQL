const DataLoader = require('dataloader');
const _ = require('lodash');

const batchUsers = async (Users, keys) => {
  return await Users.find({_id: {$in: keys}}).toArray();
}

const batchLocations = async (Locations, keys) => {
  return await Location.find({_id: {$in: keys}}).toArray();
}

const batchGoods = async (Goods, keys) => {
  return await Goods.find({_id: {$in: keys}}).toArray();
}

const batchLinks = async (Links, keys) => {
  return await Links.find({_id: {$in: keys}}).toArray();
}

//const batchVotesBylinkId = async (Votes, keys) => {
//  //find the votes data by linkId and convert to array
//  const documents = await Votes.find({linkId: {$in: keys}}).toArray();
//
//  // grouping the data in array by linkId ==> {'1': [...], '2': [...]}
//  const gs = _.groupBy(documents, 'linkId');
//
//  //order by keys
//  return keys.map(key =>  gs[key] || [] );
//}

module.exports = ({Users, Locations, Goods, Links}) => ({
  userLoader: new DataLoader(
    keys => batchUsers(Users, keys),
    {cacheKeyFn: key => key.toString()},
  ),
  locationLoader: new DataLoader(
    keys => batchLocations(Locations, keys),
    {cacheKeyFn: key => key.toString()},
  ),
  goodsLoader: new DataLoader(
    keys => batchGoods(Goods, keys),
    {cacheKeyFn: key => key.toString()},
  ),
  linkLoader: new DataLoader(
    keys => batchLinks(Links, keys),
    {cacheKeyFn: key => key.toString()},
  ),
});
