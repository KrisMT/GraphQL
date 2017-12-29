const DataLoader = require('dataloader');
const _ = require('lodash');

async function batchUsers (Users, keys) {
  return await Users.find({_id: {$in: keys}}).toArray();
}

const batchLinks = async (Links, keys) => {
  return await Links.find({_id: {$in: keys}}).toArray();
}

const batchVotesBylinkId = async (Votes, keys) => {
  //find the votes data by linkId and convert to array
  const documents = await Votes.find({linkId: {$in: keys}}).toArray();

  // grouping the data in array by linkId ==> {'1': [...], '2': [...]}
  const gs = _.groupBy(documents, 'linkId');

  //order by keys
  return keys.map(key =>  gs[key] || [] );
}

const batchVotesByuserId = async (Votes, keys) => {
  //find the votes data by userId and convert to array
  const documents = await Votes.find({userId: {$in: keys}}).toArray();

  // grouping the data in array by linkId ==> {'1': [...], '2': [...]}
  const gs = _.groupBy(documents, 'userId');

  //order by keys
  return keys.map(key =>  gs[key] || [] );
}

module.exports = ({Users, Links, Votes}) => ({
  userLoader: new DataLoader(
    keys => batchUsers(Users, keys),
    {cacheKeyFn: key => key.toString()},
  ),
  linkLoader: new DataLoader(
    keys => batchLinks(Links, keys),
    {cacheKeyFn: key => key.toString()},
  ),
  voteBylinkIdLoader: new DataLoader(
    keys => batchVotesBylinkId(Votes, keys),
    {cacheKeyFn: key => key.toString()},
  ),
  voteByuserIdLoader: new DataLoader(
    keys => batchVotesByuserId(Votes, keys),
    {cacheKeyFn: key => key.toString()},
  ),
});
