const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = require('./schema');
const connecMongo = require('./mongo-connector');
const {authenticate} = require('./authentication');
const buildDataLoaders = require('./dataloaders');

const start = async () => {
  const mongo = await connecMongo();

  const buildOptions =  async (req, res) => {
    const user = await authenticate(req, mongo.Users);
    return {
      context: {
        dataloaders: buildDataLoaders(mongo),
        mongo,
        user,
      },
      schema,
    };
  };

  var app = express();
  app.use('/graphql', bodyParser.json(), graphqlExpress(
    buildOptions
  ));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    passHeader: `'Authorization': 'bearer token-NIL@xxx.xxx'`,
  }));

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`);
  });
}

start();
