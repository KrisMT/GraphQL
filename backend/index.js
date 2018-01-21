const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const  expressPlayground  = require('graphql-playground-middleware-express').default;
const cors = require('cors');
const { execute, subscribe } = require('graphql');
const { createServer } = require('http');
const { SubscriptionServer } = require('subscriptions-transport-ws');

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
  const PORT = 4000;

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use('/graphql', bodyParser.json(), graphqlExpress(
    buildOptions
  ));

  app.use('/playground', expressPlayground({
    endpoint: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/graphql`,
  }));

  const server = createServer(app);

  const subscriptionBuildOptions = async (connectionParams,webSocket) =>
  {
    return {
      dataloaders: buildDataLoaders(mongo),
      mongo,
    }
  }

  server.listen(PORT, () => {
    SubscriptionServer.create(
      { execute, subscribe, schema, onConnect: subscriptionBuildOptions },
      { server, path: '/graphql' },
    );

    console.log(`Hackernews GraphQL server running on port ${PORT}.`);
  });
}

start();
