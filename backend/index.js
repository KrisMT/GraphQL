const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const cors = require('cors');

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
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use('/graphql', bodyParser.json(), graphqlExpress(
    buildOptions
  ));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`Hackernews GraphQL server running on port ${PORT}.`);
  });
}

start();
